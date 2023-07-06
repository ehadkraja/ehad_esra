const {Pool, Client} = require('pg');

const client = new Client({
    user: 'user',
    host: 'postgres',
    database: 'db',
    password: 'pass',
    port: 5432,
});
client.connect()

exports.getUsers = async () => {
    const results = await client.query('SELECT user_id as id,name,email,role FROM users ORDER BY user_id ASC');
    return results.rows;
}


exports.login = async (email, password) => {
    const results = await client.query('SELECT user_id as id,name,email,role FROM users where email = $1 and password =  $2', [email, password]);
    return results.rows[0];

}

exports.addUser = async (user) => {
    let res
    try {
        res = await client.query('INSERT INTO users(name,email,password,role) VALUES ($1, $2,$3,$4)', [user.name, user.email, user.password, 'user']);
    } catch {
        return null;
    }
    if (res.rowCount)
        return this.login(user.email, user.password)
    else
        return null
}

exports.deleteUser = async (user) => {
    let res
    try {
        res = await client.query('DELETE FROM users where email = $1', [user.email]);
    } catch {
        return null;
    }
    if (res.rowCount)
        return user
    else
        return null
}


exports.addObservation = async (observation) => {
    let res
    try {
        res = await client.query('INSERT INTO observation(lat,long,type,description,user_id,status) VALUES ($1, $2,$3,$4,$5,$6)',
            [observation.lat.toString(), observation.long.toString(), observation.type.toString(), observation.description.toString(), observation.userId, 'pending']);
    } catch {
        return null;
    }
    if (res.rowCount)
        return observation
    else
        return null
}


exports.updateObservation = async (observation) => {
    let res
    try {
        res = await client.query('UPDATE observation set lat=$1,long=$2,type=$3,description=$4,status=$5 where id = $6 and user_id=$7',
            [observation.lat.toString(), observation.long.toString(), observation.type.toString(), observation.description.toString(),"pending", observation.id, observation.userId]);
    } catch {
        return null;
    }
    if (res.rowCount)
        return []
    else
        return null
}

exports.getObservationsToBeApproved = async () => {
    const results = await client.query('SELECT * FROM observation where status = $1 ORDER BY created DESC',["pending"]);
    return results.rows;
}
exports.getObservationsApproved = async () => {
    const results = await client.query('SELECT * FROM observation where status = $1 ORDER BY created DESC',["approved"]);
    return results.rows;
}
exports.getObservationsRejected = async () => {
    const results = await client.query('SELECT * FROM observation where status = $1 ORDER BY created DESC',["rejected"]);
    return results.rows;
}

exports.getUserObservations = async (observation) => {
    const results = await client.query('SELECT * FROM observation where user_id = $1', [observation.userId]);
    return results.rows;
}


exports.getUserObservation = async (observation) => {
    const results = await client.query('SELECT * FROM observation where user_id = $1 and id = $2', [observation.userId, observation.id]);
    return results.rows;
}


exports.deleteObservation = async (observation) => {
    let res
    try {
        res = await client.query('DELETE FROM observation where id = $1', [observation.id]);
    } catch {
        return null;
    }
    if (res.rowCount)
        return observation
    else
        return null
}


exports.approveObservation = async (observation) => {
    let res
    try {
        res = await client.query('UPDATE observation set status=$1 where id = $2', ["approved",observation.id]);
    } catch {
        return null;
    }
    if (res.rowCount)
        return observation
    else
        return null
}

exports.rejectObservation = async (observation) => {
    let res
    try {
        res = await client.query('UPDATE observation set status=$1 where id = $2', ["rejected",observation.id]);
    } catch {
        return null;
    }
    if (res.rowCount)
        return observation
    else
        return null
}


exports.getHighestReports = async (observation) => {
    const results = await client.query('SELECT user_id,count(*) as count FROM observation group by user_id order by count desc');
    return results.rows;
}

exports.getHighestApproved = async (observation) => {
    const results = await client.query('SELECT user_id,count(*) as count FROM observation where status = $1 group by user_id order by count desc',["approved"]);
    return results.rows;
}

exports.getHighestRejected = async (observation) => {
    const results = await client.query('SELECT user_id,count(*) as count FROM observation where status = $1 group by user_id order by count desc',["rejected"]);
    return results.rows;
}
