-- Adminer 4.8.1 PostgreSQL 13.4 dump

DROP TABLE IF EXISTS "blood-donation";
CREATE TABLE "public"."blood-donation" (
    "donors_id" smallint NOT NULL,
    "donated_time" timestamptz NOT NULL
) WITH (oids = false);


-- 2022-03-21 17:45:17.76457+05:30
