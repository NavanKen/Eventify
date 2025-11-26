-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.banner (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text,
  image_url text NOT NULL,
  created_at timestamp without time zone DEFAULT now(),
  status boolean NOT NULL DEFAULT true,
  updated_at timestamp without time zone,
  CONSTRAINT banner_pkey PRIMARY KEY (id)
);
CREATE TABLE public.category (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image text,
  description text,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone,
  CONSTRAINT category_pkey PRIMARY KEY (id)
);
CREATE TABLE public.event (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category_id uuid,
  location text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  banner_image text,
  status text DEFAULT 'unpublished'::text,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  CONSTRAINT event_pkey PRIMARY KEY (id),
  CONSTRAINT event_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(id)
);
CREATE TABLE public.ticket (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL,
  ticket_name text NOT NULL,
  price integer NOT NULL,
  quota integer NOT NULL,
  sold integer DEFAULT 0,
  description text,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone,
  CONSTRAINT ticket_pkey PRIMARY KEY (id),
  CONSTRAINT ticket_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.event(id)
);
CREATE TABLE public.ticket_pass (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  transaction_id uuid NOT NULL,
  ticket_id uuid NOT NULL,
  qr_code text,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  CONSTRAINT ticket_pass_pkey PRIMARY KEY (id),
  CONSTRAINT ticket_pass_ticket_id_fkey FOREIGN KEY (ticket_id) REFERENCES public.ticket(id),
  CONSTRAINT ticket_pass_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transaction(id)
);
CREATE TABLE public.transaction (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  order_code text NOT NULL UNIQUE,
  user_id uuid,
  event_id uuid,
  ticket_id uuid,
  quantity integer NOT NULL,
  total_price integer NOT NULL,
  payment_status text DEFAULT 'pending'::text,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone,
  customer_name text,
  CONSTRAINT transaction_pkey PRIMARY KEY (id),
  CONSTRAINT transaction_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.event(id),
  CONSTRAINT transaction_ticket_id_fkey FOREIGN KEY (ticket_id) REFERENCES public.ticket(id),
  CONSTRAINT transaction_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.users (
  id uuid NOT NULL,
  name text,
  email text,
  phone text,
  avatar text,
  role text DEFAULT 'customer'::text,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone,
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);

CREATE OR REPLACE VIEW transaction_search_view AS
SELECT 
  t.*,
  e.title AS event_title,
  tk.ticket_name,
  tk.price AS ticket_price,
  u.name AS user_name,
  u.role AS user_role
FROM transaction t
LEFT JOIN event e ON e.id = t.event_id
LEFT JOIN ticket tk ON tk.id = t.ticket_id
LEFT JOIN users u ON u.id = t.user_id;

