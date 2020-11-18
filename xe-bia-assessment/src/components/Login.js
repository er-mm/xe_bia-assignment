import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: '25ch',
	},
	grid: {
		margin: 30,
	},
	text: {
		marginLeft: '45px'
	}
}));
export default function Login({ setName, userList, history }) {
	const classes = useStyles();
	const [uName, setUName] = useState('');
	const [pass, setPass] = useState('');
	const [err, setErr] = useState('');
	console.log(history);
	console.log(userList);
	const handleClick = (e) => {
		e.preventDefault();
		const user = userList?.results?.find(user => user.name === uName && user.birth_year === pass);
		if (user) {
			history.push('/search');
			setName(user.name);
		}
		else setErr('Please fill correct details');
	}
	return (
		<>
			<Grid container direction="column" alignItems="center" className={classes.grid} spacing={3}>
				<Grid item>
					<Typography className={classes.text} variant="h3" gutterBottom>Username</Typography>
					<TextField
						label="Enter Username"
						id="outlined-margin-dense"
						className={classes.textField}
						margin="dense"
						variant="outlined"
						onChange={(e) => setUName(e.target.value)}
					/>
				</Grid>
				<Grid item>
					<Typography className={classes.text} variant="h3" gutterBottom>Password</Typography>
					<TextField
						label="Enter Password"
						id="outlined-margin-dense"
						className={classes.textField}
						helperText={err}
						err={!!err}
						margin="dense"
						variant="outlined"
						type="password"
						onChange={(e) => setPass(e.target.value)}
					/>
				</Grid>
				<Grid item>
					<Button variant="contained" color="primary" onClick={handleClick}>
						Login
					</Button>
				</Grid>
			</Grid>
		</>
	)
}
