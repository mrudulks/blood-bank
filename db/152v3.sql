-- Adminer 4.8.1 PostgreSQL 13.4 dump

CREATE SEQUENCE "organised by_id_seq" INCREMENT  MINVALUE  MAXVALUE  CACHE ;

CREATE TABLE "public"."organised_by" (
    "o_id" integer DEFAULT nextval('"organised by_id_seq"') NOT NULL,
    "name" character varying(255) NOT NULL,
    CONSTRAINT "organised by_pkey" PRIMARY KEY ("o_id")
) WITH (oids = false);

INSERT INTO "organised_by" ("o_id", "name") VALUES
(1,	'testing 1'),
(2,	'testing 2'),
(3,	'testing 3'),
(4,	'Testing 4'),
(9,	'aSA SDSADASD');

-- 2022-04-16 10:57:58.176622+05:30
