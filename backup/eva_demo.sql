PGDMP     -    $                 |            eva    14.2    14.1 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
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
          public          postgres    false    223            �            1259    38995425    Counterpartie.Addresses    TABLE     �   CREATE TABLE public."Counterpartie.Addresses" (
    id integer NOT NULL,
    owner integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "Address" character varying(255)
);
 -   DROP TABLE public."Counterpartie.Addresses";
       public         heap    postgres    false            �            1259    38995424    Counterpartie.Addresses_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Counterpartie.Addresses_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public."Counterpartie.Addresses_id_seq";
       public          postgres    false    252            �           0    0    Counterpartie.Addresses_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public."Counterpartie.Addresses_id_seq" OWNED BY public."Counterpartie.Addresses".id;
          public          postgres    false    251            �            1259    67536    Counterparties    TABLE     �  CREATE TABLE public."Counterparties" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    name character varying(150),
    "Comment" character varying(100),
    "FullName" character varying(255),
    "testReqBoolean" boolean,
    "testReqNumber" numeric(14,2),
    "testReqDate" timestamp with time zone,
    "Address" character varying(255),
    "Reference.TypesOfPrice" integer
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
    "updatedAt" timestamp with time zone NOT NULL,
    owner integer,
    test character varying(255)
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
          public          postgres    false    229            �            1259    75389    Nomenclatures    TABLE     3  CREATE TABLE public."Nomenclatures" (
    id integer NOT NULL,
    name character varying(150),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "Comment" character varying(100),
    "FullName" character varying(250),
    "Reference.Unit" integer
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
          public          postgres    false    245            �            1259    38994361 
   Order.etcs    TABLE     �   CREATE TABLE public."Order.etcs" (
    id integer NOT NULL,
    owner integer,
    test character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
     DROP TABLE public."Order.etcs";
       public         heap    postgres    false            �            1259    38994360    Order.etcs_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Order.etcs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."Order.etcs_id_seq";
       public          postgres    false    250            �           0    0    Order.etcs_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Order.etcs_id_seq" OWNED BY public."Order.etcs".id;
          public          postgres    false    249            �            1259    38983488    Orders    TABLE     1  CREATE TABLE public."Orders" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    number character varying(9),
    date timestamp with time zone,
    "Reference.Counterpartie" integer,
    "Comment" character varying(255)
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
          public          postgres    false    237            �            1259    38861318    Organizations    TABLE     \  CREATE TABLE public."Organizations" (
    id integer NOT NULL,
    name character varying(150),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "Comment" character varying(255),
    "GLN" character varying(13),
    "Address" character varying(255),
    "FullName" character varying(255)
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
          public          postgres    false    225            �            1259    67967    Prices    TABLE       CREATE TABLE public."Prices" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "Reference.TypesOfPrice" integer,
    "Price" numeric(14,2),
    "Reference.Nomenclature" integer
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
          public          postgres    false    239            �            1259    39003011    TypesOfPrices    TABLE     �   CREATE TABLE public."TypesOfPrices" (
    id integer NOT NULL,
    name character varying(150),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 #   DROP TABLE public."TypesOfPrices";
       public         heap    postgres    false            �            1259    39003010    TypesOfPrices_id_seq    SEQUENCE     �   CREATE SEQUENCE public."TypesOfPrices_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."TypesOfPrices_id_seq";
       public          postgres    false    254            �           0    0    TypesOfPrices_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."TypesOfPrices_id_seq" OWNED BY public."TypesOfPrices".id;
          public          postgres    false    253            �            1259    1114654    Units    TABLE     	  CREATE TABLE public."Units" (
    id integer NOT NULL,
    name character varying(150),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "Kod" character varying(255),
    "FullName" character varying(255)
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
   Warehouses    TABLE     �   CREATE TABLE public."Warehouses" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    name character varying(150),
    "Comment" character varying(255)
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
       public          postgres    false    210    209    210            �           2604    38780493    Constants id    DEFAULT     p   ALTER TABLE ONLY public."Constants" ALTER COLUMN id SET DEFAULT nextval('public."Constants_id_seq"'::regclass);
 =   ALTER TABLE public."Constants" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223    224            �           2604    38995428    Counterpartie.Addresses id    DEFAULT     �   ALTER TABLE ONLY public."Counterpartie.Addresses" ALTER COLUMN id SET DEFAULT nextval('public."Counterpartie.Addresses_id_seq"'::regclass);
 K   ALTER TABLE public."Counterpartie.Addresses" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    251    252    252            �           2604    67539    Counterparties id    DEFAULT     z   ALTER TABLE ONLY public."Counterparties" ALTER COLUMN id SET DEFAULT nextval('public."Counterparties_id_seq"'::regclass);
 B   ALTER TABLE public."Counterparties" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    212    212            �           2604    38991108    Desadv.Products id    DEFAULT     |   ALTER TABLE ONLY public."Desadv.Products" ALTER COLUMN id SET DEFAULT nextval('public."Desadv.Products_id_seq"'::regclass);
 C   ALTER TABLE public."Desadv.Products" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    248    247    248            �           2604    38990114 
   Desadvs id    DEFAULT     l   ALTER TABLE ONLY public."Desadvs" ALTER COLUMN id SET DEFAULT nextval('public."Desadvs_id_seq"'::regclass);
 ;   ALTER TABLE public."Desadvs" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    243    244    244            �           2604    38957717    Forms id    DEFAULT     h   ALTER TABLE ONLY public."Forms" ALTER COLUMN id SET DEFAULT nextval('public."Forms_id_seq"'::regclass);
 9   ALTER TABLE public."Forms" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    231    232            �           2604    38957708 
   Modules id    DEFAULT     l   ALTER TABLE ONLY public."Modules" ALTER COLUMN id SET DEFAULT nextval('public."Modules_id_seq"'::regclass);
 ;   ALTER TABLE public."Modules" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    229    230            �           2604    75392    Nomenclatures id    DEFAULT     x   ALTER TABLE ONLY public."Nomenclatures" ALTER COLUMN id SET DEFAULT nextval('public."Nomenclatures_id_seq"'::regclass);
 A   ALTER TABLE public."Nomenclatures" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            �           2604    38990947    Order.Products id    DEFAULT     z   ALTER TABLE ONLY public."Order.Products" ALTER COLUMN id SET DEFAULT nextval('public."Order.Products_id_seq"'::regclass);
 B   ALTER TABLE public."Order.Products" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    245    246    246            �           2604    38994364    Order.etcs id    DEFAULT     r   ALTER TABLE ONLY public."Order.etcs" ALTER COLUMN id SET DEFAULT nextval('public."Order.etcs_id_seq"'::regclass);
 >   ALTER TABLE public."Order.etcs" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    250    249    250            �           2604    38983491 	   Orders id    DEFAULT     j   ALTER TABLE ONLY public."Orders" ALTER COLUMN id SET DEFAULT nextval('public."Orders_id_seq"'::regclass);
 :   ALTER TABLE public."Orders" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    238    237    238            �           2604    38861321    Organizations id    DEFAULT     x   ALTER TABLE ONLY public."Organizations" ALTER COLUMN id SET DEFAULT nextval('public."Organizations_id_seq"'::regclass);
 A   ALTER TABLE public."Organizations" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    226    226            �           2604    67970 	   Prices id    DEFAULT     j   ALTER TABLE ONLY public."Prices" ALTER COLUMN id SET DEFAULT nextval('public."Prices_id_seq"'::regclass);
 :   ALTER TABLE public."Prices" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            �           2604    1095581    Requisites id    DEFAULT     r   ALTER TABLE ONLY public."Requisites" ALTER COLUMN id SET DEFAULT nextval('public."Requisites_id_seq"'::regclass);
 >   ALTER TABLE public."Requisites" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            �           2604    38979099    Roles id    DEFAULT     h   ALTER TABLE ONLY public."Roles" ALTER COLUMN id SET DEFAULT nextval('public."Roles_id_seq"'::regclass);
 9   ALTER TABLE public."Roles" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    234    233    234            �           2604    38957700    Subsystems id    DEFAULT     r   ALTER TABLE ONLY public."Subsystems" ALTER COLUMN id SET DEFAULT nextval('public."Subsystems_id_seq"'::regclass);
 >   ALTER TABLE public."Subsystems" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    227    228            �           2604    38988588    TabPartReqs id    DEFAULT     t   ALTER TABLE ONLY public."TabPartReqs" ALTER COLUMN id SET DEFAULT nextval('public."TabPartReqs_id_seq"'::regclass);
 ?   ALTER TABLE public."TabPartReqs" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    241    242    242            �           2604    38988105    TabParts id    DEFAULT     n   ALTER TABLE ONLY public."TabParts" ALTER COLUMN id SET DEFAULT nextval('public."TabParts_id_seq"'::regclass);
 <   ALTER TABLE public."TabParts" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    240    239    240            �           2604    39003014    TypesOfPrices id    DEFAULT     x   ALTER TABLE ONLY public."TypesOfPrices" ALTER COLUMN id SET DEFAULT nextval('public."TypesOfPrices_id_seq"'::regclass);
 A   ALTER TABLE public."TypesOfPrices" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    254    253    254            �           2604    1114657    Units id    DEFAULT     h   ALTER TABLE ONLY public."Units" ALTER COLUMN id SET DEFAULT nextval('public."Units_id_seq"'::regclass);
 9   ALTER TABLE public."Units" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            �           2604    38979106    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    235    236    236            �           2604    67946    Warehouses id    DEFAULT     r   ALTER TABLE ONLY public."Warehouses" ALTER COLUMN id SET DEFAULT nextval('public."Warehouses_id_seq"'::regclass);
 >   ALTER TABLE public."Warehouses" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    213    214            �          0    67458    Configs 
   TABLE DATA           N   COPY public."Configs" (id, state, data, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    210   ��       �          0    38780468 	   Constants 
   TABLE DATA           V   COPY public."Constants" (id, name, value, "createdAt", "updatedAt", type) FROM stdin;
    public          postgres    false    224   �       �          0    38995425    Counterpartie.Addresses 
   TABLE DATA           c   COPY public."Counterpartie.Addresses" (id, owner, "createdAt", "updatedAt", "Address") FROM stdin;
    public          postgres    false    252   �       �          0    67536    Counterparties 
   TABLE DATA           �   COPY public."Counterparties" (id, "createdAt", "updatedAt", name, "Comment", "FullName", "testReqBoolean", "testReqNumber", "testReqDate", "Address", "Reference.TypesOfPrice") FROM stdin;
    public          postgres    false    212   ��       �          0    38991105    Desadv.Products 
   TABLE DATA           V   COPY public."Desadv.Products" (id, "createdAt", "updatedAt", owner, test) FROM stdin;
    public          postgres    false    248   ��       �          0    38990111    Desadvs 
   TABLE DATA           O   COPY public."Desadvs" (id, number, date, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    244   ��       �          0    38957714    Forms 
   TABLE DATA           N   COPY public."Forms" (id, name, xbase64, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    232   D�       �          0    38957705    Modules 
   TABLE DATA           P   COPY public."Modules" (id, name, xbase64, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    230   a�       �          0    75389    Nomenclatures 
   TABLE DATA           v   COPY public."Nomenclatures" (id, name, "createdAt", "updatedAt", "Comment", "FullName", "Reference.Unit") FROM stdin;
    public          postgres    false    218   ~�       �          0    38990944    Order.Products 
   TABLE DATA           |   COPY public."Order.Products" (id, "createdAt", "updatedAt", "Reference.Nomenclature", owner, "Quantity", price) FROM stdin;
    public          postgres    false    246   �       �          0    38994361 
   Order.etcs 
   TABLE DATA           Q   COPY public."Order.etcs" (id, owner, test, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    250   ��       �          0    38983488    Orders 
   TABLE DATA           t   COPY public."Orders" (id, "createdAt", "updatedAt", number, date, "Reference.Counterpartie", "Comment") FROM stdin;
    public          postgres    false    238   x�       �          0    38861318    Organizations 
   TABLE DATA           v   COPY public."Organizations" (id, name, "createdAt", "updatedAt", "Comment", "GLN", "Address", "FullName") FROM stdin;
    public          postgres    false    226   ��       �          0    67967    Prices 
   TABLE DATA           }   COPY public."Prices" (id, "createdAt", "updatedAt", "Reference.TypesOfPrice", "Price", "Reference.Nomenclature") FROM stdin;
    public          postgres    false    216   =�       �          0    1095578 
   Requisites 
   TABLE DATA           Q   COPY public."Requisites" (id, owner, data, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    220   ��       �          0    38979096    Roles 
   TABLE DATA           G   COPY public."Roles" (id, "Name", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    234   ��       �          0    38957697 
   Subsystems 
   TABLE DATA           S   COPY public."Subsystems" (id, name, display, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    228   ��       �          0    38988585    TabPartReqs 
   TABLE DATA           R   COPY public."TabPartReqs" (id, owner, data, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    242   ^�       �          0    38988102    TabParts 
   TABLE DATA           V   COPY public."TabParts" (id, owner, data, "createdAt", "updatedAt", state) FROM stdin;
    public          postgres    false    240   ��       �          0    39003011    TypesOfPrices 
   TABLE DATA           M   COPY public."TypesOfPrices" (id, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    254   ��       �          0    1114654    Units 
   TABLE DATA           X   COPY public."Units" (id, name, "createdAt", "updatedAt", "Kod", "FullName") FROM stdin;
    public          postgres    false    222   �       �          0    38979103    Users 
   TABLE DATA           �   COPY public."Users" (id, "Name", "Descr", "EAuth", "Show", "Password", email, "AdmRole", "createdAt", "updatedAt", "RoleId") FROM stdin;
    public          postgres    false    236   }�       �          0    67943 
   Warehouses 
   TABLE DATA           U   COPY public."Warehouses" (id, "createdAt", "updatedAt", name, "Comment") FROM stdin;
    public          postgres    false    214   ��       �           0    0    Configs_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Configs_id_seq"', 125, true);
          public          postgres    false    209            �           0    0    Constants_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Constants_id_seq"', 1, false);
          public          postgres    false    223            �           0    0    Counterpartie.Addresses_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public."Counterpartie.Addresses_id_seq"', 24, true);
          public          postgres    false    251            �           0    0    Counterparties_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."Counterparties_id_seq"', 34, true);
          public          postgres    false    211            �           0    0    Desadv.Products_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."Desadv.Products_id_seq"', 4, true);
          public          postgres    false    247            �           0    0    Desadvs_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Desadvs_id_seq"', 5, true);
          public          postgres    false    243            �           0    0    Forms_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Forms_id_seq"', 1, false);
          public          postgres    false    231            �           0    0    Modules_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Modules_id_seq"', 1, false);
          public          postgres    false    229            �           0    0    Nomenclatures_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."Nomenclatures_id_seq"', 16, true);
          public          postgres    false    217            �           0    0    Order.Products_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."Order.Products_id_seq"', 49, true);
          public          postgres    false    245            �           0    0    Order.etcs_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Order.etcs_id_seq"', 29, true);
          public          postgres    false    249            �           0    0    Orders_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Orders_id_seq"', 65, true);
          public          postgres    false    237            �           0    0    Organizations_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."Organizations_id_seq"', 8, true);
          public          postgres    false    225            �           0    0    Prices_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Prices_id_seq"', 59, true);
          public          postgres    false    215            �           0    0    Requisites_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Requisites_id_seq"', 78, true);
          public          postgres    false    219            �           0    0    Roles_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Roles_id_seq"', 2, true);
          public          postgres    false    233            �           0    0    Subsystems_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Subsystems_id_seq"', 1, false);
          public          postgres    false    227            �           0    0    TabPartReqs_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."TabPartReqs_id_seq"', 20, true);
          public          postgres    false    241            �           0    0    TabParts_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."TabParts_id_seq"', 9, true);
          public          postgres    false    239            �           0    0    TypesOfPrices_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."TypesOfPrices_id_seq"', 2, true);
          public          postgres    false    253            �           0    0    Units_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Units_id_seq"', 4, true);
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
       public            postgres    false    224                       2606    38995430 4   Counterpartie.Addresses Counterpartie.Addresses_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public."Counterpartie.Addresses"
    ADD CONSTRAINT "Counterpartie.Addresses_pkey" PRIMARY KEY (id);
 b   ALTER TABLE ONLY public."Counterpartie.Addresses" DROP CONSTRAINT "Counterpartie.Addresses_pkey";
       public            postgres    false    252            �           2606    67541 "   Counterparties Counterparties_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."Counterparties"
    ADD CONSTRAINT "Counterparties_pkey" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public."Counterparties" DROP CONSTRAINT "Counterparties_pkey";
       public            postgres    false    212            
           2606    38991110 $   Desadv.Products Desadv.Products_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public."Desadv.Products"
    ADD CONSTRAINT "Desadv.Products_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."Desadv.Products" DROP CONSTRAINT "Desadv.Products_pkey";
       public            postgres    false    248                       2606    38990116    Desadvs Desadvs_pkey 
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
       public            postgres    false    218                       2606    38990949 "   Order.Products Order.Products_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."Order.Products"
    ADD CONSTRAINT "Order.Products_pkey" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public."Order.Products" DROP CONSTRAINT "Order.Products_pkey";
       public            postgres    false    246                       2606    38994366    Order.etcs Order.etcs_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Order.etcs"
    ADD CONSTRAINT "Order.etcs_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."Order.etcs" DROP CONSTRAINT "Order.etcs_pkey";
       public            postgres    false    250                        2606    38983493    Orders Orders_pkey 
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
       public            postgres    false    228                       2606    38988592    TabPartReqs TabPartReqs_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."TabPartReqs"
    ADD CONSTRAINT "TabPartReqs_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."TabPartReqs" DROP CONSTRAINT "TabPartReqs_pkey";
       public            postgres    false    242                       2606    38988109    TabParts TabParts_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."TabParts"
    ADD CONSTRAINT "TabParts_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."TabParts" DROP CONSTRAINT "TabParts_pkey";
       public            postgres    false    240                       2606    39003016     TypesOfPrices TypesOfPrices_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."TypesOfPrices"
    ADD CONSTRAINT "TypesOfPrices_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."TypesOfPrices" DROP CONSTRAINT "TypesOfPrices_pkey";
       public            postgres    false    254            �           2606    1114659    Units Units_pkey 
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
       public            postgres    false    214                       2606    39003758    Users Users_RoleId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_RoleId_fkey" FOREIGN KEY ("RoleId") REFERENCES public."Roles"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 E   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_RoleId_fkey";
       public          postgres    false    236    234    3324            �   @  x�ŗ]O�0��鯈z;j��+�/ӄ4`�Lh�nB��li�g���w���	�����}|��a`����{{6��I��.L��x��/W���Qr�݅I�;tQ��^^��y��q�Z���{Rt���畝��&KZǤ����]����8���hZIrYa��	��&wn�� ����L�(���7�7(���֖�+���0�$^��D.�痳�YT��;vY�ܵ��t��/�석�q���y ��F*"�	�2"0�	���/�7af�i��O���ύ,���D2�5�R֬t7�M����|�a�2q-���E��6(7W�����4�xR���j7���E����Ӯ~{%ZFK#3� ���nZ�/i�$�IZ$�f�a梖�x��Ml�}b|P�"$q�6JS����Ѧ�!�Y�/I��
n���P,7���`�FP�� 
݃mKbo;@��|�B�Jw���3����z�]�\�CWdO�)ی�0��r� "tw
�&J�sB��4��(8�6�?��nu ��E2 B5�!j�.�3��T����_��;�_�Y�c�הNDW_��[�.�-�q����&�:%�le�o�F�)U�2�LK�-,���k����g�(��g[��(#{x���1�]�����d�ge��J�j��Rd�0΍�(ԉNw'�e6m�y=	��0Lu�0ݕ��c$�biD��3~H&�,=���>Mc��ec��PIX�u�e����7؝���z������Dr���-���-�oա�tZĭ	l�8�[��[��_q�����z)6i(��מ��t��`0��~2�      �     x�u�=k�0�Y�ދ����h,]�BS�.j�$���3����JMb�-�x�=H�K����7
��DU��� x%��B;}'k�[	-��7���m�\`�+����2��R�&��G�jӭ�NM�R̮�a����XRH�GעIဆ=�>>�c��O��tq^;�(�]�,�WV8U�:P��'q���XG�B�S��6��-�E�Y`n��*�c��?�4�?��@�͵�ҕ�au�ݧt��������~�      �   �   x�}�K� �p�� 0���?G�҄�z;O�1�@@y�	7l�b���� ���}-b�m��b©0��h(�U��*:�($b	���$��V�hTTWќGN4*40ͻb����p!����®���� ��`�I�BqCG����*:8_w�&�XS�8)ftT<S��Y�zj      �   �   x�m���0Eg�+��D�6y4++TH@��������G�����ٱXA�\>��H�c�,�#����П�rёr�)&x`'�B0f 1��E.*%��f]�>�P�vy��=}
��7OO�j|;����RX���tmND�bz	�jv?�Q��yc�H�?�      �   c   x�}�A
�0Dѵ9E\KK2M��,^��T���Ӣ������
7u "�A�o���u�cY�We�n�Z���N�Q쾂etI.%�R�|��b4E":eI,E      �   ;   x�3�4�CN# �F
�V@�m`62	)XZY��[������ &��      �      x������ � �      �      x������ � �      �   �   x�}��
1E��+����<f�t�6����`���e��p���m�pH���^�M���@Q9t� )�K�6ǴC�)�4�F����|	b��-���̩S��G�c��{`�i��).X��K�'��pH�Vk�,�2�      �   �   x�}�K� �p��"�a;�g���Q�H�B<��yM ȝ�ζ��"�E�7��[bJ^�(�}��ˬ�]��6�Έ7��2{ɪ�+@� G'��-��zk�D�m7CAp+X�I��n�wO��/�Q=��q=�'�S@*,X����Ͳ	u��2��r-;�&;b�M�k����1���(k�ǟo!k�`���l#1��(9�'�{~      �   v   x�}�M
�0����)�8�_b2g���z}��	���x>a�~i�����O��>���I4�+ե��J��K��:�VF�O�ů�e-I�yk$�9cA5(��)!�Ĺ�N�p%D< l�<>      �   Z   x�}��� C�d
��I(����s���C�j����)	�X"���Ԭ���<#�P�_T�M�#��ݡ����O����LD�{#      �   K   x�3���q��4202�54�54W04�26�2�г05�60�'�G\F���.�M�,�,�����,�lN� Ս~      �   6   x�3�4202�54�54S02�20�21ѳ45�60�'e�ih`�g`�i����� �@�      �     x��X���6=K_!�ژ�I��ݢE�b�)zhrPlnb����\tQ��3����[c��_�'xސ3o�������_��]|��no˝[�Zt��v~�M����CUW���:<�u���m��,W�}S�h�V�e׹�:,�,��u�mjZw�޽Z�]�j<�O��`�2�\ӏq�_q�!��䘁��X��ᚠ5`��zݸ�}�|��r�w�}���J�"G�=$x�hynE�r���Ɛ���e��(���,/�[:bd*OWaP�|o�Wug�oܝk\�r췲q��}��O�Ϙ.�d��\X�dp���L�<�/,�#+�ae��Tᑍ�T@����gvA0e%�\�D� J���G�InA0f,�R!c�X�����C喃�?0"5�R0�#u��޸?�-��Ύ�s������awަ1�i��J1/I�2�2�
�L��I����֕ՙ�y#J��	�7���R��)�g!�eѫB��I<.�9�`r����V�S����7-��O3N��_*�,p��P�P��A3A\q�����W�V&�
'�J�m��)�b\��2r?{��0=٘���ל���Q[V_��Y�a���z��ƕU��^B�I�^�s�� T� ^�3/��p���^���D��R6���a��d�4�y?a1r��c���$O< L�Er��d�ດɅ��+�M��e1�R�C59��_�ͤ�<��Y}��\�����t��F=�2�>dHN��6�E�`������n/�G�����x�����H�^0��@�GP�eL�*��1${8���ZŜ�eV���!g��1�Ju��b��������f�z i���j��ۑ�U$��4��A>��M��(�}�t�������5C�����P:=F���������x#d�S�T���p@϶=�VG���Tb\F�j�h���tګmّ�O�P��Sz����j�1q"��_����J%O�n�~'�n��?�����<5�qj�-9g{]~��4�시�      �   L   x�3�tL����,.)J,�/�4202�54�54W04�2��24�346�60�#�e�Z��E������	V�p)�=... Q�      �   X   x�344�tO�K-J��,�4202�54�54W02�25�25�37�60�-�ehh����K��!N�`)�~S��Ĝ�b\&��4 $����� �g']      �   I  x�͓=o�0Eg�k��{��%���Ņ��@dUQ��^'ATU��������D	�;��M:WSI}�L�?`��t��!�}���>l�Pa����*$��wy�������_���,�M�[W��L
lsl?#��ZqX�z����J`ʤ7\^V�UӐ�*9�~�-z�sd�f��Q���0۟��}St9��b?y��f��]h��}��Sƍ>i�c��/s��&��7�.�/�/��H�	[:?�/��,��xW��0V��0ĝV1�(��ƪɜO�X��qo��c��-1, �JZa�M��,V�,S���q��s0�      �   �   x����N� �sy���.�JanM�'} /�����j��.�Fi�����|��:ս�x�B�į�<����<~�Kx-��{�S�9�:�oS��:���w�;�=������6�%��Q�K;���w�׷�S��l��}nTz��4!
�T��Y"YU�~��*6�u��r�����Uj��F!Ͱ�=i���Wٞ����ۮ�F�e9҃�����1�	z�v�      �   O   x�3�(-J�H,��K�4202�50�52R04�21�20�305�60�#�e�����Z�������H����	p)�=... p�(      �   b   x�3�pv�4202�54�52Q04�26�20�305�60�'enb�����Z�e��� Uk�kd�`hneliej�gl`�0����g@brvbz*W� |��      �   D  x�}��n�@�5<E�Gf`����@)UmLaDeԑ���Wc�h��I��O���C����q(j@�1pfK��iF��� ���B���Чv��
�HQE�q�܌h����xIHnBԄ��m�hK:���$��@Q�n��U�R���,����T�i���&^�?aV��Uk��V�UV׷�8�'E���m��ב��ƕc��;�-9�+�>�:��Wd���:d2D�C�HEn������������H�g�vr$?*u�ҙ�G���F�[��<b�8'�v[��L��*�3',�8�v��v�8�(~;�f      �   o   x�}α�@���<�����9�!���)af`@&	UDJ�?}z��mEZ�r�� M��.�9ۮi�Ӣ���Un�x��"��XheT{�Ӏ���'���>��..     