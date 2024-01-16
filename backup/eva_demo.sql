PGDMP         	                 |            eva    14.2    14.1 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
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
          public          postgres    false    211            �            1259    38991105    Desadv.Products    TABLE     �   CREATE TABLE public."Desadv.Products" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 %   DROP TABLE public."Desadv.Products";
       public         heap    postgres    false            �            1259    38991104    Desadv.Products_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Desadv.Products_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public."Desadv.Products_id_seq";
       public          postgres    false    248            �           0    0    Desadv.Products_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Desadv.Products_id_seq" OWNED BY public."Desadv.Products".id;
          public          postgres    false    247            �            1259    38990111    Desadvs    TABLE     �   CREATE TABLE public."Desadvs" (
    id integer NOT NULL,
    number character varying(9),
    date timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Desadvs";
       public         heap    postgres    false            �            1259    38990110    Desadvs_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Desadvs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Desadvs_id_seq";
       public          postgres    false    244            �           0    0    Desadvs_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Desadvs_id_seq" OWNED BY public."Desadvs".id;
          public          postgres    false    243            �            1259    38957714    Forms    TABLE     �   CREATE TABLE public."Forms" (
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
          public          postgres    false    217            �            1259    38990944    Order.Products    TABLE       CREATE TABLE public."Order.Products" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "Reference.Nomenclature" integer,
    owner integer,
    "Quantity" numeric(14,3),
    price numeric(14,2)
);
 $   DROP TABLE public."Order.Products";
       public         heap    postgres    false            �            1259    38990943    Order.Products_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Order.Products_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."Order.Products_id_seq";
       public          postgres    false    246            �           0    0    Order.Products_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public."Order.Products_id_seq" OWNED BY public."Order.Products".id;
          public          postgres    false    245            �            1259    38983488    Orders    TABLE     R  CREATE TABLE public."Orders" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    number character varying(9),
    date timestamp with time zone,
    "Reference.Counterpartie" integer,
    "Comment" character varying(255),
    test character varying(255)
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
    "updatedAt" timestamp with time zone NOT NULL,
    state integer
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
       public          postgres    false    211    212    212            �           2604    38991108    Desadv.Products id    DEFAULT     |   ALTER TABLE ONLY public."Desadv.Products" ALTER COLUMN id SET DEFAULT nextval('public."Desadv.Products_id_seq"'::regclass);
 C   ALTER TABLE public."Desadv.Products" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    247    248    248            �           2604    38990114 
   Desadvs id    DEFAULT     l   ALTER TABLE ONLY public."Desadvs" ALTER COLUMN id SET DEFAULT nextval('public."Desadvs_id_seq"'::regclass);
 ;   ALTER TABLE public."Desadvs" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    244    243    244            �           2604    38957717    Forms id    DEFAULT     h   ALTER TABLE ONLY public."Forms" ALTER COLUMN id SET DEFAULT nextval('public."Forms_id_seq"'::regclass);
 9   ALTER TABLE public."Forms" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    231    232    232            �           2604    38957708 
   Modules id    DEFAULT     l   ALTER TABLE ONLY public."Modules" ALTER COLUMN id SET DEFAULT nextval('public."Modules_id_seq"'::regclass);
 ;   ALTER TABLE public."Modules" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    229    230    230            �           2604    75392    Nomenclatures id    DEFAULT     x   ALTER TABLE ONLY public."Nomenclatures" ALTER COLUMN id SET DEFAULT nextval('public."Nomenclatures_id_seq"'::regclass);
 A   ALTER TABLE public."Nomenclatures" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            �           2604    38990947    Order.Products id    DEFAULT     z   ALTER TABLE ONLY public."Order.Products" ALTER COLUMN id SET DEFAULT nextval('public."Order.Products_id_seq"'::regclass);
 B   ALTER TABLE public."Order.Products" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    245    246    246            �           2604    38983491 	   Orders id    DEFAULT     j   ALTER TABLE ONLY public."Orders" ALTER COLUMN id SET DEFAULT nextval('public."Orders_id_seq"'::regclass);
 :   ALTER TABLE public."Orders" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    237    238    238            �           2604    38861321    Organizations id    DEFAULT     x   ALTER TABLE ONLY public."Organizations" ALTER COLUMN id SET DEFAULT nextval('public."Organizations_id_seq"'::regclass);
 A   ALTER TABLE public."Organizations" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    225    226            �           2604    67970 	   Prices id    DEFAULT     j   ALTER TABLE ONLY public."Prices" ALTER COLUMN id SET DEFAULT nextval('public."Prices_id_seq"'::regclass);
 :   ALTER TABLE public."Prices" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            �           2604    1095581    Requisites id    DEFAULT     r   ALTER TABLE ONLY public."Requisites" ALTER COLUMN id SET DEFAULT nextval('public."Requisites_id_seq"'::regclass);
 >   ALTER TABLE public."Requisites" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            �           2604    38979099    Roles id    DEFAULT     h   ALTER TABLE ONLY public."Roles" ALTER COLUMN id SET DEFAULT nextval('public."Roles_id_seq"'::regclass);
 9   ALTER TABLE public."Roles" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    233    234    234            �           2604    38957700    Subsystems id    DEFAULT     r   ALTER TABLE ONLY public."Subsystems" ALTER COLUMN id SET DEFAULT nextval('public."Subsystems_id_seq"'::regclass);
 >   ALTER TABLE public."Subsystems" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    227    228    228            �           2604    38988588    TabPartReqs id    DEFAULT     t   ALTER TABLE ONLY public."TabPartReqs" ALTER COLUMN id SET DEFAULT nextval('public."TabPartReqs_id_seq"'::regclass);
 ?   ALTER TABLE public."TabPartReqs" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    242    241    242            �           2604    38988105    TabParts id    DEFAULT     n   ALTER TABLE ONLY public."TabParts" ALTER COLUMN id SET DEFAULT nextval('public."TabParts_id_seq"'::regclass);
 <   ALTER TABLE public."TabParts" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    240    239    240            �           2604    1114657    Units id    DEFAULT     h   ALTER TABLE ONLY public."Units" ALTER COLUMN id SET DEFAULT nextval('public."Units_id_seq"'::regclass);
 9   ALTER TABLE public."Units" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            �           2604    38979106    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    236    235    236            �           2604    67946    Warehouses id    DEFAULT     r   ALTER TABLE ONLY public."Warehouses" ALTER COLUMN id SET DEFAULT nextval('public."Warehouses_id_seq"'::regclass);
 >   ALTER TABLE public."Warehouses" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    214    214            �          0    67458    Configs 
   TABLE DATA           N   COPY public."Configs" (id, state, data, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    210   ��       �          0    38780468 	   Constants 
   TABLE DATA           V   COPY public."Constants" (id, name, value, "createdAt", "updatedAt", type) FROM stdin;
    public          postgres    false    224   ��       �          0    67536    Counterparties 
   TABLE DATA           �   COPY public."Counterparties" (id, "createdAt", "updatedAt", name, "Comment", "FullName", "testReqBoolean", "testReqNumber", "testReqDate", "Reference.Price") FROM stdin;
    public          postgres    false    212   ��       �          0    38991105    Desadv.Products 
   TABLE DATA           I   COPY public."Desadv.Products" (id, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    248   <�       �          0    38990111    Desadvs 
   TABLE DATA           O   COPY public."Desadvs" (id, number, date, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    244   Y�       �          0    38957714    Forms 
   TABLE DATA           N   COPY public."Forms" (id, name, xbase64, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    232   ��       �          0    38957705    Modules 
   TABLE DATA           P   COPY public."Modules" (id, name, xbase64, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    230   ��       �          0    75389    Nomenclatures 
   TABLE DATA           �   COPY public."Nomenclatures" (id, name, "createdAt", "updatedAt", "Comment", "FullName", "Reference.Unit", "Reference.Price") FROM stdin;
    public          postgres    false    218   ެ       �          0    38990944    Order.Products 
   TABLE DATA           |   COPY public."Order.Products" (id, "createdAt", "updatedAt", "Reference.Nomenclature", owner, "Quantity", price) FROM stdin;
    public          postgres    false    246   v�       �          0    38983488    Orders 
   TABLE DATA           z   COPY public."Orders" (id, "createdAt", "updatedAt", number, date, "Reference.Counterpartie", "Comment", test) FROM stdin;
    public          postgres    false    238   ��       �          0    38861318    Organizations 
   TABLE DATA           X   COPY public."Organizations" (id, name, "createdAt", "updatedAt", "Comment") FROM stdin;
    public          postgres    false    226   h�       �          0    67967    Prices 
   TABLE DATA           Q   COPY public."Prices" (id, name, "createdAt", "updatedAt", "Comment") FROM stdin;
    public          postgres    false    216   ��       �          0    1095578 
   Requisites 
   TABLE DATA           Q   COPY public."Requisites" (id, owner, data, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    220   4�       �          0    38979096    Roles 
   TABLE DATA           G   COPY public."Roles" (id, "Name", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    234   �       �          0    38957697 
   Subsystems 
   TABLE DATA           S   COPY public."Subsystems" (id, name, display, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    228   @�       �          0    38988585    TabPartReqs 
   TABLE DATA           R   COPY public."TabPartReqs" (id, owner, data, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    242   ��       �          0    38988102    TabParts 
   TABLE DATA           V   COPY public."TabParts" (id, owner, data, "createdAt", "updatedAt", state) FROM stdin;
    public          postgres    false    240   �       �          0    1114654    Units 
   TABLE DATA           c   COPY public."Units" (id, name, "createdAt", "updatedAt", "Kod", "FullName", "Comment") FROM stdin;
    public          postgres    false    222   ��       �          0    38979103    Users 
   TABLE DATA           �   COPY public."Users" (id, "Name", "Descr", "EAuth", "Show", "Password", email, "AdmRole", "createdAt", "updatedAt", "RoleId") FROM stdin;
    public          postgres    false    236   ��       �          0    67943 
   Warehouses 
   TABLE DATA           `   COPY public."Warehouses" (id, "createdAt", "updatedAt", name, "Comment", "Address") FROM stdin;
    public          postgres    false    214   Q�       �           0    0    Configs_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Configs_id_seq"', 122, true);
          public          postgres    false    209            �           0    0    Constants_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Constants_id_seq"', 1, false);
          public          postgres    false    223            �           0    0    Counterparties_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."Counterparties_id_seq"', 29, true);
          public          postgres    false    211            �           0    0    Desadv.Products_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."Desadv.Products_id_seq"', 1, false);
          public          postgres    false    247            �           0    0    Desadvs_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Desadvs_id_seq"', 4, true);
          public          postgres    false    243            �           0    0    Forms_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Forms_id_seq"', 1, false);
          public          postgres    false    231            �           0    0    Modules_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Modules_id_seq"', 1, false);
          public          postgres    false    229            �           0    0    Nomenclatures_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."Nomenclatures_id_seq"', 16, true);
          public          postgres    false    217            �           0    0    Order.Products_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."Order.Products_id_seq"', 22, true);
          public          postgres    false    245            �           0    0    Orders_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Orders_id_seq"', 11, true);
          public          postgres    false    237            �           0    0    Organizations_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."Organizations_id_seq"', 8, true);
          public          postgres    false    225            �           0    0    Prices_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Prices_id_seq"', 59, true);
          public          postgres    false    215            �           0    0    Requisites_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Requisites_id_seq"', 71, true);
          public          postgres    false    219            �           0    0    Roles_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Roles_id_seq"', 2, true);
          public          postgres    false    233            �           0    0    Subsystems_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Subsystems_id_seq"', 1, false);
          public          postgres    false    227            �           0    0    TabPartReqs_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."TabPartReqs_id_seq"', 17, true);
          public          postgres    false    241            �           0    0    TabParts_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."TabParts_id_seq"', 7, true);
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
       public            postgres    false    212            �           2606    38991110 $   Desadv.Products Desadv.Products_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public."Desadv.Products"
    ADD CONSTRAINT "Desadv.Products_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."Desadv.Products" DROP CONSTRAINT "Desadv.Products_pkey";
       public            postgres    false    248            �           2606    38990116    Desadvs Desadvs_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Desadvs"
    ADD CONSTRAINT "Desadvs_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Desadvs" DROP CONSTRAINT "Desadvs_pkey";
       public            postgres    false    244            �           2606    38957721    Forms Forms_pkey 
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
       public            postgres    false    218            �           2606    38990949 "   Order.Products Order.Products_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."Order.Products"
    ADD CONSTRAINT "Order.Products_pkey" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public."Order.Products" DROP CONSTRAINT "Order.Products_pkey";
       public            postgres    false    246            �           2606    38983493    Orders Orders_pkey 
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
       public            postgres    false    214            �           2606    38993568    Users Users_RoleId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_RoleId_fkey" FOREIGN KEY ("RoleId") REFERENCES public."Roles"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_RoleId_fkey";
       public          postgres    false    236    3306    234            �   �  x���Qo�0ǟ�O�j��v����=�!64!�f�dJ�@|w�I�&S��cβ������'�����߹���N߻Ϯr��M_N������b��nn���� �]�<�8
�q���5�eQ�+:����Z���'�Q� f(�gVfL�����P' V�-	Z� �C��pv^�>ޕ��y��q��h��2��n��g�	H��*�R	<��-(& ^*F���Z���|*��׮>$�	�U��$�-��q�qL@[�-�A֊�|�7/��Ż���nϣ#�L)�o�f��oGG���Jθ�.�0B���6/V?s�*����q%�;������:�M�z����e��9�[��$#[U���E�A[>�pcX	Lh+B�9X.Y�v�dLY��M�]u�W~��y�����tX�"�-)�@�VJ3��:�ܗ��#F|���-nT�W�Dj�y0�%U+0�]�@��e{�w�>�^�=K��f�z�l�0TY�b���Jwr����sDƴ| M;Ӏæ1wu���ϕݕ/�*Y��*c2�lʡ�n��F��p��
��#>-�V?<����=��ˏ�J��u�P!��J�����dǇ��.n����w�q�{W�7h��u2�T�L8�WZ/{Ԍ���ܻ�ir�[��N�f2�X�0\iF	Ӂ�q`��r���h�ŀRZ�f1���� e��3TG���\6���7�xr_��ۦBB鷍��;�\�0Pa4M>��d��uٿ      �   �   x�e��j�0е�ٗ1��J�,]���B7�A�w��k��C\m/:H1�G9��e��iV)����v=Z��!h �����:��D�D�8T�fJ
�Fu��:�j%����rL�r�(�Q���#�#6^[r���&ԣ7%��~�����/��m~y�)���7�U�m���5���j��bV��k	���A��h�f�B�ό��G�`t�@5��Yw]�[5cr      �   �   x�m��
1E��W���yl��i-��lm,Tu���������-s.�����G5aKY�JCٓf��SE����������|DxC_'"N��<�!����y�3ڨ&�I;��JE�a8_�PT�Z���M�fM]r��'6#�YR+[D���̤G
5�\��>:羖�?E      �      x������ � �      �   ;   x�3�4�CN# �F
�V@�m`62	)XZY��[������ &��      �      x������ � �      �      x������ � �      �   �   x�}̻
1��z��K�L.3�t�6����`�����/�EY��4?��ph�~k���ywB8>:x��2[Vd-I��NS�P��t�Cð��k�6^��"��OJ�.�����ˊ��-�A�C��H���J/��1O�J3�      �   x   x�}�Q
�@�o��/�]��Yz�s4	�e-�G�a�N�`좻�&����!��E�B�"B�<r~M�[�M#����U����������#�L1�U���7eo
X�D��YG���JOn�� �b7      �   Z   x�}�A� ��
���"¾���C0��Mo�Ns
�E6�JZ���pE��Ѐ����Rb�$�M�y���@��k���{ AR"B      �   I   x�3���q��4202�54�54W04�26�2�г05�60�'��e���낮����B����vd)��=... L      �   c   x�}�;
�0 �ڜ�^���Cx�tba'޿PI!Q���a�۲bG@#ZO�.��� ����*��7��]'NF��tZ	i��Y�s2��+]DI!�@)�      �   �  x��XK��6>K�B�5Y�3|�
�"m�K.��M��V��.����]�a9�.�u�b���73-2-��Wm���y��w��>T��������[[o�o�n�Cu��-v���~��.��c]���]ٶ���ş�n�)��ַ�	�W�Ь�h�'C���e�������y��c��Q1�)W�����}(�ᇀ㡢�N����O���b7�1nq�%��r�C�F��l6uh�kD[y%���q2	^ �DǴ����^��K��G˔�=�Τ<�3R��	�_������>ɴ�3&V S�1p�ﶣ���:��e��M�?�_6���s��0�b�G�::a �C'�мIR������J3~"�S.x�?������"�KǄT���r��.���˔�ȴ����\����]��e2U�{~�Д�Y;�+���q������X1�jl��fbʰ���e;��ê���t��t��V��UI���D��n����@@ς{8�BY�����_O�e�0��J�܁;�B�򢛽f���gW&g�O�%0g�O��:�u�Q=-8yM�R��` �Z*24�i�й6fP���4�:�L�v`fi�����i=!y���{!�N೸B�喦�W��T��"5PLc.�$5/��'�	�&p��]���c�����z��pn�}y�YVP��p�1�f4��@�*�s��n�2i��BL��95ye�i��D�_�%Ł^##�d!�HZ�!�T�#�	W�������G�>7��/��S������q�8��P6�:���]H P&�q�e:��ӵ�j���ñ���ʺ�������U0�,+��H#�`�R�Zr��3����m���9I�/M1�� �� �k&q�k;M��� �h�P�F��hʿ�<�����      �   L   x�3�tL����,.)J,�/�4202�54�54W04�2��24�346�60�#�e�Z��E������	V�p)�=... Q�      �   X   x�344�tO�K-J��,�4202�54�54W02�25�25�37�60�-�ehh����K��!N�`)�~S��Ĝ�b\&��4 $����� �g']      �   (  x����n�0E���&c0�A7Q�l\3I���̸*���$B��U$K��zqcȣ�r�d*�y
sP�t&�,�R�1�nT1�������D'/�8jhHf	;�eؾ����sa�GZt��=䜌��;p�8�zw��iڦ6�t�צ�q���[�oF��!�t�t �P���B��@�M�_q��E���m����~tz�],��M�ny�W��=�T@d�K-U��R�"*O�{%��7nsu���k
*�P��P���U�t
;�X���Ȼ��4/������W"��_�(�      �   �   x��ͻ
�0�ṹ��U�C҆�I/�ELGHZ��n��ur��{��VHX=u�}Ң7}>��^뱿��P�C�a:��|�1�a�,�WE@�lk��pg�u+�o�;.�8�9��"�BާP���1,Up5��D��vNDb�`k?��(���>      �   e   x�}�1
�0@�99����Ic��8Zz �"����Ep���e���Ņ�86!&�D�I���,vP�����y.OΎ�	�dH�^���'��P��\�
�xD��Vs      �   D  x�}��n�@�5<E�Gf`����@)UmLaDeԑ���Wc�h��I��O���C����q(j@�1pfK��iF��� ���B���Чv��
�HQE�q�܌h����xIHnBԄ��m�hK:���$��@Q�n��U�R���,����T�i���&^�?aV��Uk��V�UV׷�8�'E���m��ב��ƕc��;�-9�+�>�:��Wd���:d2D�C�HEn������������H�g�vr$?*u�ҙ�G���F�[��<b�8'�v[��L��*�3',�8�v��v�8�(~;�f      �   t   x�34�4202�54�54Q0��22�26�352�60�'U\�_���e�1g�qY��60�26ճ4��4E
n�%'��Z#CK+CS+cs=#sS4c��cd�gh�b�ؔ=... O0G     