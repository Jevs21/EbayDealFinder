create table if not exists item(
    id integer primary key,
    name text not null,
    uri text not null,
    last_item text not null,
    price_point text,
    active integer not null
);
