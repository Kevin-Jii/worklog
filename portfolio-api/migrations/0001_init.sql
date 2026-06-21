-- Migration number: 0001 	 2026-06-21T04:47:44.252Z
CREATE TABLE projects (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	slug TEXT NOT NULL UNIQUE,
	title TEXT NOT NULL,
	industry TEXT NOT NULL,
	summary TEXT NOT NULL,
	stack TEXT,
	sort_order INTEGER DEFAULT 0,
	created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contacts (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT,
	email TEXT,
	message TEXT NOT NULL,
	created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO projects (slug, title, industry, summary, stack, sort_order)
VALUES
	(
		'medical-emergency-platform',
		'急诊管理平台',
		'医疗',
		'多院区急救现场的流程界面、PDA 扫码、离线缓存、打印集成和设备适配。',
		'Vue2 / TinyMCE / WebSocket / PDA / C-Lodop',
		10
	),
	(
		'smart-city-device-console',
		'设备与数据协同界面',
		'智慧城市',
		'设备状态、实时消息、第三方服务和前端操作台的数据流转项目经验。',
		'WebSocket / Device SDK / Nginx / Linux',
		20
	),
	(
		'tower-supply-chain',
		'Tower 餐饮供应链中心',
		'零售',
		'餐饮供应链管理中心，覆盖 RBAC、库存预警、对象存储、桌面端管理和自动通知。',
		'Go Gin / Flutter / Redis / MySQL / RustFS',
		30
	);
