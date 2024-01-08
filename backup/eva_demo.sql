PGDMP     $    9                 |            eva    14.2    14.1 |    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16398    eva    DATABASE     `   CREATE DATABASE eva WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Russian_Russia.1251';
    DROP DATABASE eva;
                postgres    false            �            1259    67458    Configs    TABLE     �   CREATE TABLE public."Configs" (
    id integer NOT NULL,
    state integer,
    data text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Configs";
       public         heap    postgres    false            �            1259    67457    Configs_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Configs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Configs_id_seq";
       public          postgres    false    210            �           0    0    Configs_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Configs_id_seq" OWNED BY public."Configs".id;
          public          postgres    false    209            �            1259    38780468 	   Constants    TABLE       CREATE TABLE public."Constants" (
    id integer NOT NULL,
    name character varying(150),
    value character varying(250),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    type character varying(50)
);
    DROP TABLE public."Constants";
       public         heap    postgres    false            �            1259    38780425    Constants_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Constants_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Constants_id_seq";
       public          postgres    false    224            �           0    0    Constants_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."Constants_id_seq" OWNED BY public."Constants".id;
          public          postgres    false    223            �            1259    67536    Counterparties    TABLE     �  CREATE TABLE public."Counterparties" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    name character varying(150),
    "Comment" character varying(100),
    "FullName" character varying(255),
    "testReqBoolean" boolean,
    "testReqNumber" numeric(14,2),
    "testReqDate" timestamp with time zone,
    "Reference.Price" integer
);
 $   DROP TABLE public."Counterparties";
       public         heap    postgres    false            �            1259    67535    Counterparties_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Counterparties_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."Counterparties_id_seq";
       public          postgres    false    212            �           0    0    Counterparties_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public."Counterparties_id_seq" OWNED BY public."Counterparties".id;
          public          postgres    false    211            �            1259    38957714    Forms    TABLE     �   CREATE TABLE public."Forms" (
    id integer NOT NULL,
    name character varying(255),
    xbase64 text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Forms";
       public         heap    postgres    false            �            1259    38957713    Forms_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Forms_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Forms_id_seq";
       public          postgres    false    232            �           0    0    Forms_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Forms_id_seq" OWNED BY public."Forms".id;
          public          postgres    false    231            �            1259    38957705    Modules    TABLE     �   CREATE TABLE public."Modules" (
    id integer NOT NULL,
    name character varying(255),
    xbase64 text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Modules";
       public         heap    postgres    false            �            1259    38957704    Modules_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Modules_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Modules_id_seq";
       public          postgres    false    230            �           0    0    Modules_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Modules_id_seq" OWNED BY public."Modules".id;
          public          postgres    false    229            �            1259    75389    Nomenclatures    TABLE     R  CREATE TABLE public."Nomenclatures" (
    id integer NOT NULL,
    name character varying(150),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "Comment" character varying(100),
    "FullName" character varying(250),
    "Reference.Unit" integer,
    "Reference.Price" integer
);
 #   DROP TABLE public."Nomenclatures";
       public         heap    postgres    false            �            1259    75388    Nomenclatures_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Nomenclatures_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."Nomenclatures_id_seq";
       public          postgres    false    218            �           0    0    Nomenclatures_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."Nomenclatures_id_seq" OWNED BY public."Nomenclatures".id;
          public          postgres    false    217            �            1259    38983488    Orders    TABLE     5  CREATE TABLE public."Orders" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "Number" character varying(5),
    "Date" timestamp with time zone,
    "Comment" character varying(255),
    "Reference.Counterpartie" integer
);
    DROP TABLE public."Orders";
       public         heap    postgres    false            �            1259    38983487    Orders_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Orders_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Orders_id_seq";
       public          postgres    false    238            �           0    0    Orders_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Orders_id_seq" OWNED BY public."Orders".id;
          public          postgres    false    237            �            1259    38861318    Organizations    TABLE     �   CREATE TABLE public."Organizations" (
    id integer NOT NULL,
    name character varying(150),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "Comment" character varying(255)
);
 #   DROP TABLE public."Organizations";
       public         heap    postgres    false            �            1259    38861317    Organizations_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Organizations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."Organizations_id_seq";
       public          postgres    false    226            �           0    0    Organizations_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."Organizations_id_seq" OWNED BY public."Organizations".id;
          public          postgres    false    225            �            1259    67967    Prices    TABLE     �   CREATE TABLE public."Prices" (
    id integer NOT NULL,
    name character varying(150),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "Comment" character varying(255)
);
    DROP TABLE public."Prices";
       public         heap    postgres    false            �            1259    67966    Prices_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Prices_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Prices_id_seq";
       public          postgres    false    216            �           0    0    Prices_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Prices_id_seq" OWNED BY public."Prices".id;
          public          postgres    false    215            �            1259    1095578 
   Requisites    TABLE     �   CREATE TABLE public."Requisites" (
    id integer NOT NULL,
    owner integer,
    data text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
     DROP TABLE public."Requisites";
       public         heap    postgres    false            �            1259    1095577    Requisites_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Requisites_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."Requisites_id_seq";
       public          postgres    false    220            �           0    0    Requisites_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Requisites_id_seq" OWNED BY public."Requisites".id;
          public          postgres    false    219            �            1259    38979096    Roles    TABLE     �   CREATE TABLE public."Roles" (
    id integer NOT NULL,
    "Name" character varying(50),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Roles";
       public         heap    postgres    false            �            1259    38979094    Roles_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Roles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Roles_id_seq";
       public          postgres    false    234            �           0    0    Roles_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Roles_id_seq" OWNED BY public."Roles".id;
          public          postgres    false    233            �            1259    38957697 
   Subsystems    TABLE     �   CREATE TABLE public."Subsystems" (
    id integer NOT NULL,
    name character varying(50),
    display boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
     DROP TABLE public."Subsystems";
       public         heap    postgres    false            �            1259    38957696    Subsystems_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Subsystems_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."Subsystems_id_seq";
       public          postgres    false    228            �           0    0    Subsystems_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Subsystems_id_seq" OWNED BY public."Subsystems".id;
          public          postgres    false    227            �            1259    38988585    TabPartReqs    TABLE     �   CREATE TABLE public."TabPartReqs" (
    id integer NOT NULL,
    owner integer,
    data text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 !   DROP TABLE public."TabPartReqs";
       public         heap    postgres    false            �            1259    38988584    TabPartReqs_id_seq    SEQUENCE     �   CREATE SEQUENCE public."TabPartReqs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."TabPartReqs_id_seq";
       public          postgres    false    242            �           0    0    TabPartReqs_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."TabPartReqs_id_seq" OWNED BY public."TabPartReqs".id;
          public          postgres    false    241            �            1259    38988102    TabParts    TABLE     �   CREATE TABLE public."TabParts" (
    id integer NOT NULL,
    owner integer,
    data text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."TabParts";
       public         heap    postgres    false            �            1259    38988101    TabParts_id_seq    SEQUENCE     �   CREATE SEQUENCE public."TabParts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."TabParts_id_seq";
       public          postgres    false    240            �           0    0    TabParts_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."TabParts_id_seq" OWNED BY public."TabParts".id;
          public          postgres    false    239            �            1259    1114654    Units    TABLE     /  CREATE TABLE public."Units" (
    id integer NOT NULL,
    name character varying(150),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "Kod" character varying(255),
    "FullName" character varying(255),
    "Comment" character varying(255)
);
    DROP TABLE public."Units";
       public         heap    postgres    false            �            1259    1114653    Units_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Units_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Units_id_seq";
       public          postgres    false    222            �           0    0    Units_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Units_id_seq" OWNED BY public."Units".id;
          public          postgres    false    221            �            1259    38979103    Users    TABLE     �  CREATE TABLE public."Users" (
    id integer NOT NULL,
    "Name" character varying(50),
    "Descr" character varying(150),
    "EAuth" boolean,
    "Show" boolean,
    "Password" character varying(100),
    email character varying(50),
    "AdmRole" boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "RoleId" integer
);
    DROP TABLE public."Users";
       public         heap    postgres    false            �            1259    38979102    Users_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public          postgres    false    236            �           0    0    Users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;
          public          postgres    false    235            �            1259    67943 
   Warehouses    TABLE       CREATE TABLE public."Warehouses" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    name character varying(150),
    "Comment" character varying(255),
    "Address" character varying(255)
);
     DROP TABLE public."Warehouses";
       public         heap    postgres    false            �            1259    67942    Warehouses_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Warehouses_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."Warehouses_id_seq";
       public          postgres    false    214            �           0    0    Warehouses_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Warehouses_id_seq" OWNED BY public."Warehouses".id;
          public          postgres    false    213            �           2604    67461 
   Configs id    DEFAULT     l   ALTER TABLE ONLY public."Configs" ALTER COLUMN id SET DEFAULT nextval('public."Configs_id_seq"'::regclass);
 ;   ALTER TABLE public."Configs" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    210    210            �           2604    38780493    Constants id    DEFAULT     p   ALTER TABLE ONLY public."Constants" ALTER COLUMN id SET DEFAULT nextval('public."Constants_id_seq"'::regclass);
 =   ALTER TABLE public."Constants" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    224    224            �           2604    67539    Counterparties id    DEFAULT     z   ALTER TABLE ONLY public."Counterparties" ALTER COLUMN id SET DEFAULT nextval('public."Counterparties_id_seq"'::regclass);
 B   ALTER TABLE public."Counterparties" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    211    212            �           2604    38957717    Forms id    DEFAULT     h   ALTER TABLE ONLY public."Forms" ALTER COLUMN id SET DEFAULT nextval('public."Forms_id_seq"'::regclass);
 9   ALTER TABLE public."Forms" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    231    232            �           2604    38957708 
   Modules id    DEFAULT     l   ALTER TABLE ONLY public."Modules" ALTER COLUMN id SET DEFAULT nextval('public."Modules_id_seq"'::regclass);
 ;   ALTER TABLE public."Modules" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    229    230    230            �           2604    75392    Nomenclatures id    DEFAULT     x   ALTER TABLE ONLY public."Nomenclatures" ALTER COLUMN id SET DEFAULT nextval('public."Nomenclatures_id_seq"'::regclass);
 A   ALTER TABLE public."Nomenclatures" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            �           2604    38983491 	   Orders id    DEFAULT     j   ALTER TABLE ONLY public."Orders" ALTER COLUMN id SET DEFAULT nextval('public."Orders_id_seq"'::regclass);
 :   ALTER TABLE public."Orders" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    237    238    238            �           2604    38861321    Organizations id    DEFAULT     x   ALTER TABLE ONLY public."Organizations" ALTER COLUMN id SET DEFAULT nextval('public."Organizations_id_seq"'::regclass);
 A   ALTER TABLE public."Organizations" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    225    226            �           2604    67970 	   Prices id    DEFAULT     j   ALTER TABLE ONLY public."Prices" ALTER COLUMN id SET DEFAULT nextval('public."Prices_id_seq"'::regclass);
 :   ALTER TABLE public."Prices" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            �           2604    1095581    Requisites id    DEFAULT     r   ALTER TABLE ONLY public."Requisites" ALTER COLUMN id SET DEFAULT nextval('public."Requisites_id_seq"'::regclass);
 >   ALTER TABLE public."Requisites" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            �           2604    38979099    Roles id    DEFAULT     h   ALTER TABLE ONLY public."Roles" ALTER COLUMN id SET DEFAULT nextval('public."Roles_id_seq"'::regclass);
 9   ALTER TABLE public."Roles" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    234    233    234            �           2604    38957700    Subsystems id    DEFAULT     r   ALTER TABLE ONLY public."Subsystems" ALTER COLUMN id SET DEFAULT nextval('public."Subsystems_id_seq"'::regclass);
 >   ALTER TABLE public."Subsystems" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    227    228    228            �           2604    38988588    TabPartReqs id    DEFAULT     t   ALTER TABLE ONLY public."TabPartReqs" ALTER COLUMN id SET DEFAULT nextval('public."TabPartReqs_id_seq"'::regclass);
 ?   ALTER TABLE public."TabPartReqs" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    241    242    242            �           2604    38988105    TabParts id    DEFAULT     n   ALTER TABLE ONLY public."TabParts" ALTER COLUMN id SET DEFAULT nextval('public."TabParts_id_seq"'::regclass);
 <   ALTER TABLE public."TabParts" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    239    240    240            �           2604    1114657    Units id    DEFAULT     h   ALTER TABLE ONLY public."Units" ALTER COLUMN id SET DEFAULT nextval('public."Units_id_seq"'::regclass);
 9   ALTER TABLE public."Units" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222            �           2604    38979106    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    235    236    236            �           2604    67946    Warehouses id    DEFAULT     r   ALTER TABLE ONLY public."Warehouses" ALTER COLUMN id SET DEFAULT nextval('public."Warehouses_id_seq"'::regclass);
 >   ALTER TABLE public."Warehouses" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    213    214            n          0    67458    Configs 
   TABLE DATA           N   COPY public."Configs" (id, state, data, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    210   ��       |          0    38780468 	   Constants 
   TABLE DATA           V   COPY public."Constants" (id, name, value, "createdAt", "updatedAt", type) FROM stdin;
    public          postgres    false    224   _�       p          0    67536    Counterparties 
   TABLE DATA           �   COPY public."Counterparties" (id, "createdAt", "updatedAt", name, "Comment", "FullName", "testReqBoolean", "testReqNumber", "testReqDate", "Reference.Price") FROM stdin;
    public          postgres    false    212   S�       �          0    38957714    Forms 
   TABLE DATA           N   COPY public."Forms" (id, name, xbase64, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    232   �       �          0    38957705    Modules 
   TABLE DATA           P   COPY public."Modules" (id, name, xbase64, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    230   -�       v          0    75389    Nomenclatures 
   TABLE DATA           �   COPY public."Nomenclatures" (id, name, "createdAt", "updatedAt", "Comment", "FullName", "Reference.Unit", "Reference.Price") FROM stdin;
    public          postgres    false    218   J�       �          0    38983488    Orders 
   TABLE DATA           x   COPY public."Orders" (id, "createdAt", "updatedAt", "Number", "Date", "Comment", "Reference.Counterpartie") FROM stdin;
    public          postgres    false    238   ޓ       ~          0    38861318    Organizations 
   TABLE DATA           X   COPY public."Organizations" (id, name, "createdAt", "updatedAt", "Comment") FROM stdin;
    public          postgres    false    226   L�       t          0    67967    Prices 
   TABLE DATA           Q   COPY public."Prices" (id, name, "createdAt", "updatedAt", "Comment") FROM stdin;
    public          postgres    false    216   ��       x          0    1095578 
   Requisites 
   TABLE DATA           Q   COPY public."Requisites" (id, owner, data, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    220   �       �          0    38979096    Roles 
   TABLE DATA           G   COPY public."Roles" (id, "Name", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    234   
�       �          0    38957697 
   Subsystems 
   TABLE DATA           S   COPY public."Subsystems" (id, name, display, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    228   f�       �          0    38988585    TabPartReqs 
   TABLE DATA           R   COPY public."TabPartReqs" (id, owner, data, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    242   Ι       �          0    38988102    TabParts 
   TABLE DATA           O   COPY public."TabParts" (id, owner, data, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    240   ��       z          0    1114654    Units 
   TABLE DATA           c   COPY public."Units" (id, name, "createdAt", "updatedAt", "Kod", "FullName", "Comment") FROM stdin;
    public          postgres    false    222   )�       �          0    38979103    Users 
   TABLE DATA           �   COPY public."Users" (id, "Name", "Descr", "EAuth", "Show", "Password", email, "AdmRole", "createdAt", "updatedAt", "RoleId") FROM stdin;
    public          postgres    false    236   ��       r          0    67943 
   Warehouses 
   TABLE DATA           `   COPY public."Warehouses" (id, "createdAt", "updatedAt", name, "Comment", "Address") FROM stdin;
    public          postgres    false    214   �       �           0    0    Configs_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Configs_id_seq"', 120, true);
          public          postgres    false    209            �           0    0    Constants_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Constants_id_seq"', 1, false);
          public          postgres    false    223            �           0    0    Counterparties_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."Counterparties_id_seq"', 29, true);
          public          postgres    false    211            �           0    0    Forms_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Forms_id_seq"', 1, false);
          public          postgres    false    231            �           0    0    Modules_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Modules_id_seq"', 1, false);
          public          postgres    false    229            �           0    0    Nomenclatures_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."Nomenclatures_id_seq"', 15, true);
          public          postgres    false    217            �           0    0    Orders_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Orders_id_seq"', 8, true);
          public          postgres    false    237            �           0    0    Organizations_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."Organizations_id_seq"', 8, true);
          public          postgres    false    225            �           0    0    Prices_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Prices_id_seq"', 59, true);
          public          postgres    false    215            �           0    0    Requisites_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Requisites_id_seq"', 61, true);
          public          postgres    false    219            �           0    0    Roles_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Roles_id_seq"', 2, true);
          public          postgres    false    233            �           0    0    Subsystems_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Subsystems_id_seq"', 1, false);
          public          postgres    false    227            �           0    0    TabPartReqs_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."TabPartReqs_id_seq"', 12, true);
          public          postgres    false    241            �           0    0    TabParts_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."TabParts_id_seq"', 3, true);
          public          postgres    false    239            �           0    0    Units_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Units_id_seq"', 4, true);
          public          postgres    false    221            �           0    0    Users_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Users_id_seq"', 5, true);
          public          postgres    false    235            �           0    0    Warehouses_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Warehouses_id_seq"', 21, true);
          public          postgres    false    213            �           2606    67463    Configs Configs_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Configs"
    ADD CONSTRAINT "Configs_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Configs" DROP CONSTRAINT "Configs_pkey";
       public            postgres    false    210            �           2606    38780506    Constants Constants_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Constants"
    ADD CONSTRAINT "Constants_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."Constants" DROP CONSTRAINT "Constants_pkey";
       public            postgres    false    224            �           2606    67541 "   Counterparties Counterparties_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."Counterparties"
    ADD CONSTRAINT "Counterparties_pkey" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public."Counterparties" DROP CONSTRAINT "Counterparties_pkey";
       public            postgres    false    212            �           2606    38957721    Forms Forms_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Forms"
    ADD CONSTRAINT "Forms_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Forms" DROP CONSTRAINT "Forms_pkey";
       public            postgres    false    232            �           2606    38957712    Modules Modules_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Modules"
    ADD CONSTRAINT "Modules_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Modules" DROP CONSTRAINT "Modules_pkey";
       public            postgres    false    230            �           2606    75396     Nomenclatures Nomenclatures_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."Nomenclatures"
    ADD CONSTRAINT "Nomenclatures_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."Nomenclatures" DROP CONSTRAINT "Nomenclatures_pkey";
       public            postgres    false    218            �           2606    38983493    Orders Orders_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Orders" DROP CONSTRAINT "Orders_pkey";
       public            postgres    false    238            �           2606    38861323     Organizations Organizations_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."Organizations"
    ADD CONSTRAINT "Organizations_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."Organizations" DROP CONSTRAINT "Organizations_pkey";
       public            postgres    false    226            �           2606    67972    Prices Prices_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Prices"
    ADD CONSTRAINT "Prices_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Prices" DROP CONSTRAINT "Prices_pkey";
       public            postgres    false    216            �           2606    1095585    Requisites Requisites_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Requisites"
    ADD CONSTRAINT "Requisites_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."Requisites" DROP CONSTRAINT "Requisites_pkey";
       public            postgres    false    220            �           2606    38979101    Roles Roles_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Roles" DROP CONSTRAINT "Roles_pkey";
       public            postgres    false    234            �           2606    38957703    Subsystems Subsystems_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Subsystems"
    ADD CONSTRAINT "Subsystems_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."Subsystems" DROP CONSTRAINT "Subsystems_pkey";
       public            postgres    false    228            �           2606    38988592    TabPartReqs TabPartReqs_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."TabPartReqs"
    ADD CONSTRAINT "TabPartReqs_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."TabPartReqs" DROP CONSTRAINT "TabPartReqs_pkey";
       public            postgres    false    242            �           2606    38988109    TabParts TabParts_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."TabParts"
    ADD CONSTRAINT "TabParts_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."TabParts" DROP CONSTRAINT "TabParts_pkey";
       public            postgres    false    240            �           2606    1114659    Units Units_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Units"
    ADD CONSTRAINT "Units_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Units" DROP CONSTRAINT "Units_pkey";
       public            postgres    false    222            �           2606    38979109    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    236            �           2606    67948    Warehouses Warehouses_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Warehouses"
    ADD CONSTRAINT "Warehouses_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."Warehouses" DROP CONSTRAINT "Warehouses_pkey";
       public            postgres    false    214            �           2606    38989069    Users Users_RoleId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_RoleId_fkey" FOREIGN KEY ("RoleId") REFERENCES public."Roles"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_RoleId_fkey";
       public          postgres    false    3288    234    236            n   �  x����o�0Ɵ׿"�+�����#B{`ClhB�%��(�ɔ8�眴M�ij:�س���}w�E�	?�;����nn��wW�r��o����]�K����io�Ǧ� �]�"_;*}p����˪l�5�H�+_�����	r���噕F��bs��	��rAG��f ��4ܝ�~��5��]ߺzY�ESFx�Ǟ������,�0@܂b0�b�z��UWɧb���p�!� M�J-&Qm��Âc�
mѰ�@''�]Tk*�o����n� +�I1���Z���3���Z��42�����}�hz?�4î�:�/&��o?���e}���?�_UeD�ʹ1���F����Z�Q���Z���/�qOi�Ӫ-���گ�Y����3_H�S�+"�ug�48o�����&bė���iƙ��m�YﵤN &p�u��Uw�w�}�A��%�L3#���Rl�*ۧ�)Ŵ�=��@����5"cZ���=�� ����(V_fЪg��S���Q�}u���,6�E�!�x�d�JZZ�|x�����[���>�q��ab`枩�&�e�i����VP3m�����u��=/PZQ�0���J���}������
��G��}.��r�0���&Bd�w^G��k�(F��8���@�.R�P�.��iF�	�T���76������~      |   �   x�e�MK�0@���]6�L��9�g�Kw����l��M��4��2�7�ԣ���<�8��QdvH;�-[�4^�� � �ѭ�W�!��;��1��I�LGQ�2��GdGl���6N�C`g�PGoVt1����u^�R�CM��_*Ʀ�yF(�C[ݠ�R���s�x�^�dL�SlʪV�`����d5��r*�b�5�v�:HRCy������m#�hJ ����G�=���cr      p   �   x�}O��@�s_q;j�G�ѬLL�,P!E<��;TT*!"QlٱdmX�b�ƌQÂ��>�������<�TI�\\��q6&:�&�r�h-#�T��0��=��	� 9��5~fQ�d�SO�T,0�v?�T1�w���|^z�,~9ܮX�uu�#���ۢs���?E      �      x������ � �      �      x������ � �      v   �   x�3�t,(�IU����KU04�4202�54�52 �LͭLM�L,̴��Iqrq��r�g
�ch�`� �f�gij�l)�q�\F������
A�)@���@!�(]��������%#���.4����� �v2�      �   ^   x�}�A�0��ލd���o��lZ��mv'�I�y�D�
����+�!N����:�� �EfoO�V?�BǼ��ۻ�A��lx�.&���/�      ~   I   x�3���q��4202�54�54W04�26�2�г05�60�'��e���낮����B����vd)��=... L      t   c   x�}�;
�0 �ڜ�^���Cx�tba'޿PI!Q���a�۲bG@#ZO�.��� ����*��7��]'NF��tZ	i��Y�s2��+]DI!�@)�      x   �  x��WM��6=K�B�Y�3��[ڢ@Q (������Ā-o%���-��&N"d�`r��̛�G�i�����?�ϛU���߻�_�X���6~��m���csh�{ڢ��5�����z�>���qX=�}��fX�]ﶛ��h}_�:�b�qݺ���2�(� �P �r��w\x���pǱ��e��Y�M����O���U�w��p��|�?����q�3��g��<d*B�r�i]�=G�U��Z����O��LXڬ���ĲR�B�TiFăIU�W X)E��L �r�|� k�	�L[9`b2�!�3 �x��"��ݻ�5k���[��p�\��r~٠��ۊ�
JRDA?��с&W��v��np6���;˂7X��2�J2��l.x���U�n}E	QI˄Tӄ_�r���k�ig���t	3�&�\`����3�ˀ�v65�Bf�L}��<now�+�����Ul��d���]׿v�X����V#�~�S�f�]��/y%�I1�&�rP8C������su3�7�+����E���T��-��[��n1�2����%��L΄��K`��;�	u>u�Q=-8�K?k�2ɔ ^!�WdX������ܘA�P3i���
������4uܿu���NHޜ��[���Y\���l@��d2�x	(��r��J�����ڂ���o|��<d�f�|�F1	dk�,bU2)¼�D ?�s�I����A!�X�|���<�B��A����JG��6�Je��(���\n�4�I��+S<n~o���:>폰�Fq�/���/����t'��8\�L���b��Ӹ*WP�/D=`ω�3䢵�&B��]�*2�������R�11 N�7b}�25�� �Ty�cC>���>M��VbY�A������LZHsLTB�%y<S�_V�>��ݶ[�ш�=^��
@�&���a�e�a6I}7)�u�Er�C�I��cԩ%���y�?y�?E      �   L   x�3�tL����,.)J,�/�4202�54�54W04�2��24�346�60�#�e�Z��E������	V�p)�=... Q�      �   X   x�344�tO�K-J��,�4202�54�54W02�25�25�37�60�-�ehh����K��!N�`)�~S��Ĝ�b\&��4 $����� �g']      �   �   x���?O�0��9��k[����+�#��)u"炈ߝ�XHUU��ͯ7<�a��9��}��ޥ���<A�S���8�K������B�y?%�gi�sH����um���_\7��n���i���� n��A�P�M	���ʤ�����"�^K���[[�E0��9x9)��'�\������^[������sx-jKd�uy�?�����+      �   f   x�3�442�V*I�(�LQ�R
(�O)M.)V�Q*����+�
���+�r����*Y�X�Yk#��,�L����L-�R\1z\\\ ��*      z   e   x�}�1
�0@�99����Ic��8Zz �"����Ep���e���Ņ�86!&�D�I���,vP�����y.OΎ�	�dH�^���'��P��\�
�xD��Vs      �   D  x�}��n�@�5<E�Gf`����@)UmLaDeԑ���Wc�h��I��O���C����q(j@�1pfK��iF��� ���B���Чv��
�HQE�q�܌h����xIHnBԄ��m�hK:���$��@Q�n��U�R���,����T�i���&^�?aV��Uk��V�UV׷�8�'E���m��ב��ƕc��;�-9�+�>�:��Wd���:d2D�C�HEn������������H�g�vr$?*u�ҙ�G���F�[��<b�8'�v[��L��*�3',�8�v��v�8�(~;�f      r   t   x�34�4202�54�54Q0��22�26�352�60�'U\�_���e�1g�qY��60�26ճ4��4E
n�%'��Z#CK+CS+cs=#sS4c��cd�gh�b�ؔ=... O0G     