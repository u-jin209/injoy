--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-05-23 14:59:39

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
-- TOC entry 224 (class 1259 OID 16523)
-- Name: file; Type: TABLE; Schema: injoy; Owner: postgres
--

CREATE TABLE injoy.file (
    "fileId" integer NOT NULL,
    "projectId" integer NOT NULL,
    "userId" integer,
    "fileName" character varying,
    "fileSize" character varying,
    "folderId" integer,
    "fileRealPath" character varying,
    "crtDate" time without time zone DEFAULT now(),
    "uniqueName" character varying,
    "fileExtension" character varying
);


ALTER TABLE injoy.file OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16522)
-- Name: file_fileId_seq; Type: SEQUENCE; Schema: injoy; Owner: postgres
--

ALTER TABLE injoy.file ALTER COLUMN "fileId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME injoy."file_fileId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3216 (class 2606 OID 16676)
-- Name: file folderId_FK; Type: FK CONSTRAINT; Schema: injoy; Owner: postgres
--

ALTER TABLE ONLY injoy.file
    ADD CONSTRAINT "folderId_FK" FOREIGN KEY ("folderId") REFERENCES injoy.folder("folderId") ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3217 (class 2606 OID 16533)
-- Name: file projectId_FK; Type: FK CONSTRAINT; Schema: injoy; Owner: postgres
--

ALTER TABLE ONLY injoy.file
    ADD CONSTRAINT "projectId_FK" FOREIGN KEY ("projectId") REFERENCES injoy.project("projectId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3218 (class 2606 OID 16528)
-- Name: file userId_FK; Type: FK CONSTRAINT; Schema: injoy; Owner: postgres
--

ALTER TABLE ONLY injoy.file
    ADD CONSTRAINT "userId_FK" FOREIGN KEY ("userId") REFERENCES injoy."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2023-05-23 14:59:40

--
-- PostgreSQL database dump complete
--

