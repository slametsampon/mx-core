CREATE TABLE IF NOT EXISTS department (
  id VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS unit (
  id VARCHAR PRIMARY KEY,
  department_id VARCHAR REFERENCES department(id),
  name VARCHAR NOT NULL,
  location VARCHAR,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS disturbance_source (
  id VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
  type VARCHAR NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS disturbance_log (
  id VARCHAR PRIMARY KEY,
  department_id VARCHAR REFERENCES department(id),
  unit_id VARCHAR REFERENCES unit(id),
  periode VARCHAR NOT NULL,
  source_id VARCHAR REFERENCES disturbance_source(id),
  duration_minutes INT,
  category VARCHAR NOT NULL,
  description TEXT,
  created_by VARCHAR,
  created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS kpi (
  id VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  unit VARCHAR,
  type VARCHAR NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP,
  value VARCHAR
);

CREATE TABLE IF NOT EXISTS kpi_annual_target (
  id VARCHAR PRIMARY KEY,
  kpi_id VARCHAR REFERENCES kpi(id),
  department_id VARCHAR REFERENCES department(id),
  unit_id VARCHAR REFERENCES unit(id),
  year INT,
  annual_value NUMERIC,
  note TEXT,
  created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS kpi_forecast (
  id VARCHAR PRIMARY KEY,
  kpi_id VARCHAR REFERENCES kpi(id),
  department_id VARCHAR REFERENCES department(id),
  unit_id VARCHAR REFERENCES unit(id),
  periode VARCHAR,
  value NUMERIC,
  method VARCHAR,
  annual_target_id VARCHAR REFERENCES kpi_annual_target(id),
  created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS kpi_periodic_target (
  id VARCHAR PRIMARY KEY,
  annual_target_id VARCHAR REFERENCES kpi_annual_target(id),
  kpi_id VARCHAR REFERENCES kpi(id),
  department_id VARCHAR REFERENCES department(id),
  unit_id VARCHAR REFERENCES unit(id),
  periode VARCHAR,
  granularity VARCHAR,
  target_value NUMERIC,
  actual_value NUMERIC,
  actual_note TEXT,
  created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS kpi_record (
  id VARCHAR PRIMARY KEY,
  kpi_id VARCHAR REFERENCES kpi(id),
  department_id VARCHAR REFERENCES department(id),
  unit_id VARCHAR REFERENCES unit(id),
  periode VARCHAR,
  value NUMERIC,
  note TEXT,
  source VARCHAR,
  created_by VARCHAR,
  created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "user" (
  id VARCHAR PRIMARY KEY,
  username VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  role VARCHAR NOT NULL,
  avatar_url VARCHAR,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);
