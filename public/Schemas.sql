-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://github.com/pgadmin-org/pgadmin4/issues/new/choose if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public.devices
(
    id serial NOT NULL,
    user_id integer,
    deevice_name character varying(255) COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    category character varying(255) COLLATE pg_catalog."default",
    create_at timestamp with time zone NOT NULL,
    update_at timestamp with time zone NOT NULL,
    CONSTRAINT devices_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.users
(
    id serial NOT NULL,
    username character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    create_at timestamp with time zone NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.devices
    ADD CONSTRAINT devices_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;

END;