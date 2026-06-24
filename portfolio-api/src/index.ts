type ProjectRow = {
	id: number;
	slug: string;
	title: string;
	industry: string;
	summary: string;
	stack: string | null;
	sort_order: number;
	created_at: string;
};

type AiFlowRow = {
	id: number;
	title: string;
	body: string;
	icon: string;
	sort_order: number;
	created_at: string;
};

type ProfileRow = {
	name: string;
	initials: string;
	role: string;
	location: string;
	birthday: string | null;
	phone: string;
	email: string;
	blog: string | null;
	summary: string;
};

type IndustryRow = {
	key: string;
	label: string;
	title: string;
	icon: string;
	stack: string | null;
	body: string;
	signals: string;
	sort_order: number;
};

type ExperienceRow = {
	period: string;
	company: string;
	role: string;
	detail: string;
	sort_order: number;
};

type StackRow = {
	name: string;
	sort_order: number;
};

type SkillRow = {
	title: string;
	body: string;
	sort_order: number;
};

type ResumeProjectRow = {
	title: string;
	period: string;
	role: string;
	industry: string;
	stack: string | null;
	summary: string;
	highlights: string;
	sort_order: number;
};

type EducationRow = {
	period: string;
	school: string;
	major: string;
	degree: string;
	sort_order: number;
};

type ContactPayload = {
	name?: string;
	email?: string;
	message?: string;
};

function getCorsHeaders(request: Request, env: Env) {
	const origin = request.headers.get("Origin") ?? "";
	const allowedOrigins = env.ALLOWED_ORIGINS.split(",").map((item) => item.trim());
	const allowOrigin =
		allowedOrigins.includes("*") || origin.endsWith(".vercel.app")
			? origin || "*"
			: allowedOrigins.includes(origin)
				? origin
				: allowedOrigins[0];

	return {
		"Access-Control-Allow-Origin": allowOrigin,
		"Access-Control-Allow-Methods": "GET,POST,OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type",
		"Access-Control-Max-Age": "86400",
		Vary: "Origin",
	};
}

function json(data: unknown, request: Request, env: Env, init: ResponseInit = {}) {
	return Response.json(data, {
		...init,
		headers: {
			...getCorsHeaders(request, env),
			"Content-Type": "application/json; charset=utf-8",
			...init.headers,
		},
	});
}

async function listProjects(request: Request, env: Env) {
	const { results } = await env.DB.prepare(
		"SELECT id, slug, title, industry, summary, stack, sort_order, created_at FROM projects ORDER BY sort_order ASC",
	).all<ProjectRow>();

	return json({ projects: results }, request, env);
}

async function listAiFlow(request: Request, env: Env) {
	const { results } = await env.DB.prepare(
		"SELECT id, title, body, icon, sort_order, created_at FROM ai_flow ORDER BY sort_order ASC",
	).all<AiFlowRow>();

	return json({ aiFlow: results }, request, env);
}

function parseSignals(value: string) {
	try {
		const parsed = JSON.parse(value);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

async function getPortfolio(request: Request, env: Env) {
	const [profile, industries, aiFlow, experiences, stack, skills, resumeProjects, education] = await Promise.all([
		env.DB.prepare(
			"SELECT name, initials, role, location, birthday, phone, email, blog, summary FROM profile WHERE id = 1",
		).first<ProfileRow>(),
		env.DB.prepare(
			"SELECT key, label, title, icon, stack, body, signals, sort_order FROM industries ORDER BY sort_order ASC",
		).all<IndustryRow>(),
		env.DB.prepare("SELECT id, title, body, icon, sort_order, created_at FROM ai_flow ORDER BY sort_order ASC").all<AiFlowRow>(),
		env.DB.prepare(
			"SELECT period, company, role, detail, sort_order FROM experiences ORDER BY sort_order ASC",
		).all<ExperienceRow>(),
		env.DB.prepare("SELECT name, sort_order FROM tech_stack ORDER BY sort_order ASC").all<StackRow>(),
		env.DB.prepare("SELECT title, body, sort_order FROM skills ORDER BY sort_order ASC").all<SkillRow>(),
		env.DB.prepare(
			"SELECT title, period, role, industry, stack, summary, highlights, sort_order FROM resume_projects ORDER BY sort_order ASC",
		).all<ResumeProjectRow>(),
		env.DB.prepare(
			"SELECT period, school, major, degree, sort_order FROM education ORDER BY sort_order ASC",
		).all<EducationRow>(),
	]);

	return json(
		{
			profile,
			industries: industries.results.map((item) => ({
				key: item.key,
				label: item.label,
				title: item.title,
				icon: item.icon,
				stack: item.stack,
				body: item.body,
				signals: parseSignals(item.signals),
			})),
			aiFlow: aiFlow.results.map((item) => ({
				title: item.title,
				body: item.body,
				icon: item.icon,
			})),
			experiences: experiences.results.map((item) => ({
				period: item.period,
				company: item.company,
				role: item.role,
				detail: item.detail,
			})),
			stack: stack.results.map((item) => item.name),
			skills: skills.results.map((item) => ({
				title: item.title,
				body: item.body,
			})),
			projects: resumeProjects.results.map((item) => ({
				title: item.title,
				period: item.period,
				role: item.role,
				industry: item.industry,
				stack: item.stack,
				summary: item.summary,
				highlights: parseSignals(item.highlights),
			})),
			education: education.results.map((item) => ({
				period: item.period,
				school: item.school,
				major: item.major,
				degree: item.degree,
			})),
		},
		request,
		env,
	);
}

async function createContact(request: Request, env: Env) {
	let payload: ContactPayload;

	try {
		payload = await request.json<ContactPayload>();
	} catch {
		return json({ error: "Invalid JSON body" }, request, env, { status: 400 });
	}

	const name = payload.name?.trim() || null;
	const email = payload.email?.trim() || null;
	const message = payload.message?.trim();

	if (!message) {
		return json({ error: "message is required" }, request, env, { status: 400 });
	}

	await env.DB.prepare("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)")
		.bind(name, email, message)
		.run();

	return json({ ok: true }, request, env, { status: 201 });
}

export default {
	async fetch(request, env): Promise<Response> {
		const url = new URL(request.url);

		if (request.method === "OPTIONS") {
			return new Response(null, { status: 204, headers: getCorsHeaders(request, env) });
		}

		if (url.pathname === "/api/projects" && request.method === "GET") {
			return listProjects(request, env);
		}

		if (url.pathname === "/api/portfolio" && request.method === "GET") {
			return getPortfolio(request, env);
		}

		if (url.pathname === "/api/ai-flow" && request.method === "GET") {
			return listAiFlow(request, env);
		}

		if (url.pathname === "/api/contact" && request.method === "POST") {
			return createContact(request, env);
		}

		if (url.pathname === "/api/profile" && request.method === "GET") {
			return json(
				{
					name: "井科伟",
					role: "前端开发工程师",
					location: "浙江杭州",
					email: "jeckwell@126.com",
				},
				request,
				env,
			);
		}

		return json({ error: "Not found" }, request, env, { status: 404 });
	},
} satisfies ExportedHandler<Env>;
