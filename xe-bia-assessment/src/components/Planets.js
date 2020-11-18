import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	card: {
		maxWidth: 300,
		height: 250,
		backgroundColor: "#ededed"
	},
	root: {
		margin: 20,
		display: 'flex',
		justifyContent: 'center'
	},
	grid: {
		maxWidth: 1200,
	},
	typo: {
		margin: 5,
		lineHeight: 1.5
	}
}))

export default function Planets({ name, search, planets }) {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			{
				name
					? <>
						<Grid container alignItems="center" justify="center" spacing={5} className={classes.grid}>
							{
								planets?.results
									?.sort((a, b) => Number(b.population) - Number(a.population))
									.filter(planet => planet.name.toLowerCase().includes(search) || !search)
									.map((planet, index) => (
										<Grid item key={planet.name + index}>
											<Card className={classes.card}>
												<CardContent>
													<Typography className={classes.typo} variant="h3">Name : {planet.name}</Typography>
													<Typography className={classes.typo} variant="h4">Population : {planet.population}</Typography>
													<Typography className={classes.typo} variant="h4">Climate : {planet.climate}</Typography>
													<Typography className={classes.typo} variant="h4">Gravity : {planet.gravity}</Typography>
												</CardContent>
											</Card>
										</Grid>
									)) || ''
							}
						</Grid>
					</>
					: `Please Login first`
			}
		</div>
	)
}
