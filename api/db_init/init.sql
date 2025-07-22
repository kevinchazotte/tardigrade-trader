-- api/db_init/init.sql
CREATE TABLE IF NOT EXISTS widgets (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	value VARCHAR(255) NOT NULL,
	icon VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
	user_id SERIAL PRIMARY KEY,
	username VARCHAR(255) UNIQUE NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	password_hash VARCHAR(255) NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO widgets (title, value, icon) VALUES
('Total Metric', '$152,345', '💸'),
('New Users', '125', '👥'),
('Orders Pending', '18', '📦'),
('Revenue Growth', '7.2%', '📈')
ON CONFLICT (id) DO NOTHING;
