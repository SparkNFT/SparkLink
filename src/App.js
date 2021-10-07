import books from './imgs/books.png';
import './App.css';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TopBar from './TopBar';

const styles = theme => ({
  title: {
    fontFamily: 'Teko',
    marginTop: '25%',
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: 25,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 25,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: 35,
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      fontSize: 100,
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 150,
    },
  },
  title2: {
    fontFamily: 'Teko',
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: 10,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 15,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: 25,
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      fontSize: 35,
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 55,
    },
  },
  title3: {
    fontFamily: 'Teko',
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: 8,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 10,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: 15,
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      fontSize: 25,
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 45,
    },
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  titleFont: {
    fontFamily: 'Teko',
  },
  btnMain: {
    // marginTop: theme.spacing(3),
    color: '#FFFFFF',
    borderColor: '#e3f2fd',
    borderWidth: 2,
    borderRadius: 25,
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: 5,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 10,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: 16,
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      fontSize: 16,
      width: 150
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 30,
      width: 300,
      height: 70
    },
  },
  btnSecond: {
    // marginTop: theme.spacing(3),
    color: '#03A9F4',
    borderColor: '#03A9F4',
    borderWidth: 2,
    borderRadius: 25,
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: 5,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 10,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: 16,
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      fontSize: 16,
      width: 150
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: 30,
      width: 300,
      height: 70
    },
  },
  paper: {
    marginTop: theme.spacing(7),
    textAlign: 'center'
  },
  container: {
    maxWidth: '100%'
  },
  books: {
    width: '90%',
    height: 'auto'
  }
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#FDFEFE',
    },
    secondary: {
      main: '#2196f3',
    }
  },
});

class App extends Component {
  render() {
    const { classes } = this.props
    return (
      <div>

        <ThemeProvider theme={theme}>
          <div className={classes.page}>
            <TopBar />
            <Container component="main" className={classes.container}>
              <div className={classes.paper}>
                <Grid container justifyContent="center" >
                  <Grid item style={{ minWidth: '50%' }}>
                    <Typography color="inherit" noWrap className={classes.title} >
                      <b>SparkLink</b>
                    </Typography>
                    <Typography color="inherit" noWrap className={classes.title2}>
                      <b>人人传播，互相支持，仿若星星之火，点亮一片世界。</b>
                    </Typography>
                    <Typography color="inherit" noWrap className={classes.title3}>
                      发布你爱的 & 支持你爱的 & 传播你爱的
                    </Typography>

                  </Grid>
                  <Grid item xs={5} >
                    <img src={books} className={classes.books} />
                  </Grid>
                  <Grid container justifyContent="center" spacing={5} >
                    <Grid item >
                      <Button size="large" variant="contained" color="secondary" className={classes.btnMain} href='/#/introPublish'>
                        <b>去发布</b>
                      </Button>
                    </Grid>
                    <Grid item >
                      <Button size="large" variant="outlined" color="secondary" className={classes.btnSecond} href='/#/buy'>
                        <b>去购买</b>
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
        </ThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);