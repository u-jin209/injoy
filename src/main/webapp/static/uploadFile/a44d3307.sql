--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-05-22 11:35:58 KST

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
-- TOC entry 233 (class 1259 OID 16647)
-- Name: boardComment; Type: TABLE; Schema: injoy; Owner: postgres
--

CREATE TABLE injoy."boardComment" (
    "bCommentId" integer NOT NULL,
    "boardId" integer NOT NULL,
    "projectId" integer NOT NULL,
    "authorUserId" integer NOT NULL,
    "crtDate" timestamp without time zone DEFAULT '2023-05-22 00:59:51.460167'::timestamp without time zone NOT NULL,
    "mdfDate" timestamp without time zone DEFAULT '2023-05-22 00:59:51.460167'::timestamp without time zone NOT NULL,
    "bComment" character varying NOT NULL
);


ALTER TABLE injoy."boardComment" OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 16646)
-- Name: boardComment_bCommentId_seq; Type: SEQUENCE; Schema: injoy; Owner: postgres
--

ALTER TABLE injoy."boardComment" ALTER COLUMN "bCommentId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME injoy."boardComment_bCommentId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3482 (class 2606 OID 16659)
-- Name: boardComment fk_bComment_board; Type: FK CONSTRAINT; Schema: injoy; Owner: postgres
--

ALTER TABLE ONLY injoy."boardComment"
    ADD CONSTRAINT "fk_bComment_board" FOREIGN KEY ("boardId") REFERENCES injoy.board("boardId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3483 (class 2606 OID 16654)
-- Name: boardComment fk_bComment_project; Type: FK CONSTRAINT; Schema: injoy; Owner: postgres
--

ALTER TABLE ONLY injoy."boardComment"
    ADD CONSTRAINT "fk_bComment_project" FOREIGN KEY ("projectId") REFERENCES injoy.project("projectId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3484 (class 2606 OID 16664)
-- Name: boardComment fk_bComment_user; Type: FK CONSTRAINT; Schema: injoy; Owner: postgres
--

ALTER TABLE ONLY injoy."boardComment"
    ADD CONSTRAINT "fk_bComment_user" FOREIGN KEY ("authorUserId") REFERENCES injoy."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2023-05-22 11:35:59 KST

--
-- PostgreSQL database dump complete
--

