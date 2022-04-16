-- Adminer 4.8.1 PostgreSQL 13.4 dump

DROP TABLE IF EXISTS "session";
CREATE TABLE "public"."session" (
    "token" character varying(64),
    "user_id" uuid NOT NULL,
    "user_data" character varying
) WITH (oids = false);


ALTER TABLE ONLY "public"."session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE NOT DEFERRABLE;

-- 2022-04-14 10:33:18.928612+05:30
