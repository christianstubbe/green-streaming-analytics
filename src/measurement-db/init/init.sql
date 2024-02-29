create table cmcd (
    id uuid primary key default uuid_generate_v4(),
    created_on timestamp,
    sid text,
    client_id text,
    cid text,
    br numeric,
    bl numeric,
    bs boolean,
    d numeric,
    dl numeric,
    mtp numeric,
    nor text,
    nrr text,
    ot text,
    pr numeric,
    rtp numeric,
    sf text,
    st text,
    su numeric,
    tb numeric,
    v numeric,
    constraint fk_session
        foreign key(sid)
            references session(sid)
);

create table session (
    id uuid primary key default uuid_generate_v4(),
    sid text,
    created_on timestamp,
    started_on timestamp,
    terminated_on timestamp
);

create table netio (
    id uuid primary key default uuid_generate_v4(),
    created_on timestamp,
    sid text,
    model text,
    device_name text,
    mac text,
    serial_number numeric,
    num_outputs numeric,
    voltage numeric,
    frequency numeric,
    total_current numeric,
    overall_powerfactor numeric,
    phase numeric,
    total_load numeric,
    total_energy numeric
);