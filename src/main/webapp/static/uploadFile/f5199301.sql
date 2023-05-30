--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-05-22 11:36:26 KST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'EUC_KR';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 231 (class 1259 OID 16622)
-- Name: taskComment; Type: TABLE; Schema: injoy; Owner: postgres
--

CREATE TABLE injoy."taskComment" (
    "tCommentId" integer NOT NULL,
    "projectId" integer NOT NULL,
    "taskId" integer NOT NULL,
    "authorUserId" integer NOT NULL,
    "crtDate" timestamp without time zone DEFAULT '2023-05-22 00:45:44.267322'::timestamp without time zone NOT NULL,
    "mdfDate" timestamp without time zone DEFAULT '2023-05-22 00:45:44.267322'::timestamp without time zone NOT NULL,
    "tComment" character varying NOT NULL
);


ALTER TABLE injoy."taskComment" OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16621)
-- Name: taskComment_tCommentId_seq; Type: SEQUENCE; Schema: injoy; Owner: postgres
--

ALTER TABLE injoy."taskComment" ALTER COLUMN "tCommentId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME injoy."taskComment_tCommentId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3483 (class 2606 OID 16630)
-- Name: taskComment taskComment_pkey; Type: CONSTRAINT; Schema: injoy; Owner: postgres
--

ALTER TABLE ONLY injoy."taskComment"
    ADD CONSTRAINT "taskComment_pkey" PRIMARY KEY ("tCommentId");


--
-- TOC entry 3484 (class 2606 OID 16631)
-- Name: taskComment fk_tComment_project; Type: FK CONSTRAINT; Schema: injoy; Owner: postgres
--

ALTER TABLE ONLY injoy."taskComment"
    ADD CONSTRAINT "fk_tComment_project" FOREIGN KEY ("projectId") REFERENCES injoy.project("projectId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3485 (class 2606 OID 16636)
-- Name: taskComment fk_tComment_task; Type: FK CONSTRAINT; Schema: injoy; Owner: postgres
--

ALTER TABLE ONLY injoy."taskComment"
    ADD CONSTRAINT "fk_tComment_task" FOREIGN KEY ("taskId") REFERENCES injoy.task("taskId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3486 (class 2606 OID 16641)
-- Name: taskComment fk_tComment_user; Type: FK CONSTRAINT; Schema: injoy; Owner: postgres
--

ALTER TABLE ONLY injoy."taskComment"
    ADD CONSTRAINT "fk_tComment_user" FOREIGN KEY ("authorUserId") REFERENCES injoy."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2023-05-22 11:36:26 KST

--
-- PostgreSQL database dump complete
--

