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
