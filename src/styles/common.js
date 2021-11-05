let styleCommon = (theme) => {
	let common = {
		h1: {
			fontFamily: 'ANC',
			marginTop: '20%',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 22,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 22,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 32,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 32,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 32,
			},
		},
		h1x: {
			fontFamily: 'ANC',
			marginTop: '25%',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 22,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 22,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 28,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 28,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 28,
			},
		},
		h2: {
			fontFamily: 'ANC',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 20,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 25,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 25,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 25,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 45,
			},
		},
		h2center:{
			textAlign: 'center',
			letterSpacing: -1,
			wordSpacing: 3,
			paddingLeft: 50,
			paddingRight: 50,
			paddingTop: 10,
			paddingBottom: 5,
			fontFamily: 'ANC',
			marginTop: '5vw',
			color: 'white',
			lineHeight: 1,
			marginBottom: '3vw',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 18,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 20,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 23,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 26,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 45,
			},
		},
		h3:{
			letterSpacing: -1,
			wordSpacing: 3,
			fontFamily: 'ANC',
			lineHeight: 1,
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 18,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 20,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 23,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 23,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 33,
				marginTop: 10
			},
		},
		h3Color:{
			letterSpacing: -1,
			wordSpacing: 3,
			paddingLeft: 15,
			paddingRight: 10,
			paddingBottom: 15,
			fontFamily: 'ANC',
			color: 'rgb(255,112,67)',
			lineHeight: 1,
			marginBottom: '3vw',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 15,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 15,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 23,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 23,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 33,
			},
		},
		h4: {
			color: 'white',
			fontFamily: 'ANC',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 16,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 20,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 20,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 20,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 30,
			},
		},
		h5: {
			color: 'white',
			fontFamily: 'ANC',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 16,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 16,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 16,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 16,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 20,
			},
		},
		h4Link: {
			fontFamily: 'ANC',
			
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 16,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 20,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 20,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 20,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 45,
			},
		},
		btn: {
			fontFamily: 'ANC',
			color: '#FF886A',
			borderColor: '#FFFFFF',
			borderWidth: 2,
			borderRadius: '100vw',
			paddingLeft: 20,
			paddingRight: 20,
			paddingTop: 3,
			paddingBottom: 3,
			'&:hover':{
				color: '#FFFFFF',
				borderColor: '#FFFFFF',
				borderWidth: 2,
			},
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 15,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 20,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 20,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 20,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 30,
			},
		},
		btnOutline: {
			whiteSpace:'nowrap',
			// marginTop: theme.spacing(3),
			fontFamily: 'ANC',
			color: '#FFFFFF',
			borderColor: '#FFFFFF',
			borderWidth: 2,
			borderRadius: '100vw',
			paddingLeft: 20,
			paddingRight: 20,
			paddingTop: 2,
			paddingBottom: 2,
			'&:hover':{
				color: '#FF886A',
				backgroundColor: '#FFFFFF',
				borderColor: '#FFFFFF',
				borderWidth: 2,
				borderRadius: '100vw',
				paddingLeft: 20,
				paddingRight: 20,
				paddingTop: 2,
				paddingBottom: 2
			},
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 15,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 20,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 20,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 20,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 30,
			},
		},
		btnColor:{
			whiteSpace:'nowrap',
			fontFamily: 'ANC',
			color: '#FFFFFF',
			boxShadow: '0px 2px 2px #ff7d57',
			backgroundImage: 'linear-gradient(to bottom right, #FFE6F2, rgb(255,136,98))',
			borderRadius: '100vw',
			paddingLeft: 32,
			paddingRight: 32,
			paddingTop: 4,
			paddingBottom: 4,
			fontWeight: 'bold',
			'&:hover':{
				color: '#FFFFFF',
			},
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 15,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 20,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 20,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 25,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 30,
				paddingLeft: 20,
				paddingRight: 20,
				paddingTop: 16,
				paddingBottom: 16,
			},
		},
		btnColor2:{
			whiteSpace:'nowrap',
			fontFamily: 'ANC',
			backgroundColor: 'rgb(255,241,235)',
			boxShadow: '0px 2px 2px #ff7d57',
			borderWidth: 2,
			borderRadius: '100vw',
			paddingLeft: 32,
			paddingRight: 32,
			color: 'rgb(255,118,67)',
			paddingTop: 4,
			paddingBottom: 4,
			fontWeight: 'bold',
			'&:hover':{
				color: '#FFFFFF',
				backgroundColor: 'rgb(255,182,164)',
				borderColor: '#FFFFFF',
				borderWidth: 2,
			},
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 15,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 20,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 20,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 25,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 30,
				paddingLeft: 20,
				paddingRight: 20,
				paddingTop: 16,
				paddingBottom: 16,
			},
		},
		btnColor3:{
			whiteSpace:'nowrap',
			fontFamily: 'ANC',
			backgroundColor: '#FFFFFF',
			boxShadow: '0px 2px 2px #ff7d57',
			borderWidth: 2,
			borderRadius: '100vw',
			paddingLeft: 32,
			paddingRight: 32,
			color: 'rgb(255,119,68)',
			paddingTop: 6,
			paddingBottom: 6,
			marginRight: 5,
			'&:hover':{
				color: '#FFFFFF',
				backgroundColor: 'rgb(255,182,164)',
				borderColor: '#FFFFFF',
				borderWidth: 2,
			},
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 15,
				paddingLeft: 10,
				paddingRight: 10,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 16,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 16,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 16,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 19,
				paddingLeft: 20,
				paddingRight: 20,
				paddingTop: 16,
				paddingBottom: 16,
			},
		},
		container: {
			maxWidth: '100%',
			paddingLeft: '0px',
			paddingRight: '0px',
			whiteSpace: 'pre-line'
		},
		icon: {
			marginRight: theme.spacing(2),
		},
		btnImg:{
			width:'100%',
			height:'100%',
			[theme.breakpoints.between('xs', 'sm')]: {
				width:'30px',
			},
		},
		btnImgRound:{
			width:'50px',
			marginLeft:'25px',
			[theme.breakpoints.between('xs', 'sm')]: {
				width:'30px',
				marginLeft:'2px',
			},
			[theme.breakpoints.up('xl')]: {
				width:'80px',
				marginLeft:'20px',
			},
		}

	}
	return common
}
let withCommon = function(style){
	let newStyle = function(theme){
		let oldStyle = style(theme);
		let commonStyle = styleCommon(theme);
		let retObject = new Object();
		Object.assign(retObject ,commonStyle);
		for(let styleKey of Object.keys(oldStyle)){
			if(retObject [styleKey]){
				for(let style of Object.keys(oldStyle[styleKey])){
					retObject [styleKey][style] = oldStyle[styleKey][style]
				}
			}else{
				retObject [styleKey] = oldStyle[styleKey]
			}
		}
		return retObject
	}
	return newStyle
}
export default withCommon;
