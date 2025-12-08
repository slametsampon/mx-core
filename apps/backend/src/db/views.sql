CREATE OR REPLACE VIEW v_kpi_record_detail AS
SELECT
  kr.id AS record_id,
  kr.periode,
  kr.value,
  kr.source,
  kr.note,
  kr.created_by,
  kr.created_at,

  k.id AS kpi_id,
  k.name AS kpi_name,
  k.type AS kpi_type,
  k.unit AS kpi_unit,  -- 🆕 Tambahan

  d.id AS department_id,
  d.name AS department_name,

  u.id AS unit_id,
  u.name AS unit_name

FROM kpi_record kr
JOIN kpi k ON kr.kpi_id = k.id
JOIN department d ON kr.department_id = d.id
LEFT JOIN unit u ON kr.unit_id = u.id;

CREATE OR REPLACE VIEW v_department_kpi_target AS
SELECT
  d.id AS department_id,
  d.name AS department_name,
  k.id AS kpi_id,
  k.name AS kpi_name,
  k.type AS kpi_type,
  kat.year,
  kat.annual_value,
  kat.note
FROM kpi_annual_target kat
JOIN department d ON kat.department_id = d.id
JOIN kpi k ON kat.kpi_id = k.id;

CREATE OR REPLACE VIEW v_kpi_periodic_target AS
SELECT
  pt.id,
  pt.kpi_id,               -- 🆕 Tambahan
  pt.periode,
  pt.granularity,
  pt.target_value,
  pt.actual_value,
  pt.actual_note,

  kat.year,                -- 🆕 Tambahan
  k.name AS kpi_name,
  d.name AS department_name,
  u.name AS unit_name

FROM kpi_periodic_target pt
JOIN kpi_annual_target kat ON pt.annual_target_id = kat.id  -- 🆕 JOIN tambahan
JOIN kpi k ON pt.kpi_id = k.id
JOIN department d ON pt.department_id = d.id
LEFT JOIN unit u ON pt.unit_id = u.id;

CREATE OR REPLACE VIEW v_kpi_forecast AS
SELECT
  f.id,
  f.periode,
  f.value,
  f.method,
  k.name AS kpi_name,
  k.unit AS kpi_unit,        -- 🆕 Tambahan
  d.name AS department_name,
  u.name AS unit_name

FROM kpi_forecast f
JOIN kpi k ON f.kpi_id = k.id
JOIN department d ON f.department_id = d.id
LEFT JOIN unit u ON f.unit_id = u.id;

CREATE OR REPLACE VIEW v_disturbance_log_detail AS
SELECT
  dl.id,
  dl.periode,
  dl.duration_minutes,
  dl.category,
  dl.description,
  ds.name AS source_name,
  ds.type AS source_type,   -- 🆕 Tambahan
  u.name AS unit_name,
  d.name AS department_name

FROM disturbance_log dl
JOIN disturbance_source ds ON dl.source_id = ds.id
JOIN unit u ON dl.unit_id = u.id
JOIN department d ON dl.department_id = d.id;
