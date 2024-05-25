import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.cjs";

export const register = async (req, res) => {
    try {
        const userClient = await pool.connect();

        const usernameExists = await userClient.query(`SELECT * FROM users WHERE username = $1`, [req.body.username]);

        if (usernameExists.rows.length > 0) {
            return res.status(409).send({ err: `username already taken` });
        }

        const hash = bcrypt.hashSync(req.body.password, 5);

        const values = [req.body.username, req.body.email, hash, req.body.firstName, req.body.lastName, `'${req.body.dob}'`, req.body.country, req.body.phNumber, req.body.description, req.body.isEmployer];

		const createQuery = "INSERT INTO Users (username, email, password, first_name, last_name, dob, country, phNumber, description, isEmployer) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";

        const newUser = await userClient.query(createQuery, values);

        if (newUser.error) {
            console.error(newUser.error);
            return res.status(500).json({ error: "Internal server error" });
        }

        const { password, ...resUser } = newUser.rows[0];
        const token = jwt.sign(
            {
                id: resUser.id,
                username: req.body.username,
                isEmployer: req.body.isEmployer,
                country: req.body.country,
                phNumber: req.body.phNumber,
                email: req.body.email,
            },
            process.env.JWT_KEY,
            { expiresIn: "10h" }
        );

		userClient.release();
        return res.status(201).json({ msg: "User created", token, user: resUser });

    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};

export const login = async (req, res) => {
	try {
		const userClient = await pool.connect();
		const dbRes = await userClient.query("SELECT * FROM Users WHERE username= $1 ",[req.body.username]);
		const user = dbRes.rows[0];
		if (user) {
			const isCorrect = bcrypt.compareSync(req.body.password, user.password);
			if (isCorrect) {
				const { password, ...info } = user;
				const token = jwt.sign(
					{
						id: info.id,
						username: info.username,
						isEmployer: info.isemployer,
						country: info.country,
						phNumber: info.phNumber,
						email: info.email,
					},
					process.env.JWT_KEY,
					{ expiresIn: "10h" }
				);
				userClient.release();
				return res.status(200).json({ token, info });
			} else {
				userClient.release();
				return res.status(403).json({ error: "wrong username or password" });
			}
		} else {
			userClient.release();
			return res.status(404).json({ error: `unregistered user` });
		}
	} catch (err) {
		return res.status(403).json({ error: `${err}` });
	}
};

export const deleteUser = async (req, res) => {
	try {
		const userClient = await pool.connect();
		const ifUser = await userClient.query('SELECT * FROM Users WHERE username= $1',[req.body.username]);
		if(ifUser.rows.length > 0){
			const hash = ifUser.rows[0].password;
			const isCorrect = bcrypt.compareSync(req.body.password, hash);

			if(isCorrect){
				const dbRes = await userClient.query("DELETE FROM Users WHERE username= $1",[req.body.username]);

				if(dbRes.rowCount > 0){
					userClient.release();
					return res.status(202).json({msg:"user deleted successfully"});
				} else{
					return res.status(500).json({msg:"unexpected error"});
				}
			} else{
				userClient.release();
				return res.status(403).json({err:"incorrect password"});
			}
		} else{
			userClient.release();
			return res.status(404).json({msg:"incorrect username or not registered"})
		}
	} catch (err) {
		console.log(err);
		return res.status(400).json({ error : `${err}` });
	}
};

export const updateUser = async (req, res) => {
	try {
		const values = [req.body.username, req.body.email, req.body.firstName, req.body.lastName, req.body.description, req.body.country, req.body.phNumber, req.body.oldUsername];

		if(req.body.oldUsername === req.username){
			const userClient = await pool.connect();
			const dbRes = await userClient.query("SELECT * FROM Users WHERE username=$1",[req.body.username])

			const user = dbRes.rows

			if(user.length > 0){
				return res.status(409).json({msg:"username not available"});
			}

			const updatedUser = await userClient.query(`UPDATE Users SET username=$1, email=$2, first_name=$3,last_name=$4, description=$5, country=$6, phNumber=$7 WHERE username=$8 RETURNING *`,values);
			const {password, created_at, updated_at, id, ...info} = updatedUser.rows[0];

			return res.status(202).json({msg:"user updated", newUser:info});
		} else{
			return res.status(403).json({msg:"This exploit won't work."})
		}

	} catch (err) {
		return res.status(500).json({ error: `${err}` });
	}
};

export const getAllUsers = async (req, res) => {
	try {
		const userClient = await pool.connect();
		const {limit, page} = req.body;
		const dbRes = await userClient.query("SELECT username, email, first_name, last_name, dob, country, phNumber, description, isEmployer FROM Users LIMIT $1 OFFSET $2",[limit, (page - 1)*limit]);
		const users = dbRes.rows;
		userClient.release();
		return res.status(200).json({msg:"request recieved",users})
	} catch (err) {
		return res.status(404).json({ error: `${err}` });
	}
};

export const getOneUser = async (req, res) => {
	try {
		const userClient = await pool.connect();
		const dbRes = await userClient.query("SELECT username, email, first_name, last_name, dob, country, phNumber, description, isEmployer FROM Users WHERE username=$1",[req.body.username]);
		const user_info = dbRes.rows[0];
		if(user_info){
			return res.status(200).json({user_info})
		} else{
			return res.status(404).json({msg:"user not found"})
		}
	} catch (err) {
		return res.status(500).send({ error: `${err}` });
	}
};