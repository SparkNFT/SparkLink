let styleCommon = (theme) => {
	let common = {
		MarginT0:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginTop: 112,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginTop: 134,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginTop: 161,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginTop: 192,
			},
			[theme.breakpoints.up('xl')]: {
				marginTop: 232,
			},
			['@media (min-width:3200px)']: {
				marginTop: 464,
			},
		},
		MarginT1:{
			[theme.breakpoints.between('xs', 'sm')]: {
				marginTop: 72,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginTop: 86,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginTop: 104,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginTop: 124,
			},
			[theme.breakpoints.up('xl')]: {
				marginTop: 150,
			},
			['@media (min-width:3200px)']: {
				marginTop: 300,
			},
		},
		MarginT2:{
			[theme.breakpoints.between('xs', 'sm')]: {
				marginTop: 56,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginTop: 68,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginTop: 80,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginTop: 96,
			},
			[theme.breakpoints.up('xl')]: {
				marginTop: 116,
			},
			['@media (min-width:3200px)']: {
				marginTop: 232,
			},
		},
		MarginT3:{
			[theme.breakpoints.between('xs', 'sm')]: {
				marginTop: 44,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginTop: 52,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginTop: 64,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginTop: 76,
			},
			[theme.breakpoints.up('xl')]: {
				marginTop: 92,
			},
			['@media (min-width:3200px)']: {
				marginTop: 184,
			},
		},
		MarginT4:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginTop: 34,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginTop: 42,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginTop: 48,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginTop: 58,
			},
			[theme.breakpoints.up('xl')]: {
				marginTop: 70,
			},
			['@media (min-width:3200px)']: {
				marginTop: 140,
			},
		},
		MarginT5:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginTop: 28,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginTop: 34,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginTop: 40,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginTop: 48,
			},
			[theme.breakpoints.up('xl')]: {
				marginTop: 58,
			},
			['@media (min-width:3200px)']: {
				marginTop: 116,
			},
		},
		MarginT6:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginTop: 28,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginTop: 34,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginTop: 42,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginTop: 50,
			},
			[theme.breakpoints.up('xl')]: {
				marginTop: 60,
			},
			['@media (min-width:3200px)']: {
				marginTop: 120,
			},
		},
		MarginT7:{
			[theme.breakpoints.between('xs', 'sm')]: {
				marginTop: 20,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginTop: 24,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginTop: 28,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginTop: 34,
			},
			[theme.breakpoints.up('xl')]: {
				marginTop: 42,
			},
			['@media (min-width:3200px)']: {
				marginTop: 84,
			},
		},
		MarginT8:{
			[theme.breakpoints.between('xs', 'sm')]: {
				marginTop: 16,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginTop: 20,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginTop: 24,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginTop: 28,
			},
			[theme.breakpoints.up('xl')]: {
				marginTop: 34,
			},
			['@media (min-width:3200px)']: {
				marginTop: 64,
			},
		},
		MarginT9:{
			[theme.breakpoints.between('xs', 'sm')]: {
				marginTop: 14,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginTop: 16,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginTop: 21,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginTop: 24,
			},
			[theme.breakpoints.up('xl')]: {
				marginTop: 28,
			},
			['@media (min-width:3200px)']: {
				marginTop: 56,
			},

		},
		MarginT10:{
			[theme.breakpoints.between('xs', 'sm')]: {
				marginTop: 12,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginTop: 18,
			},
			[theme.breakpoints.between('md', 'xl')]: {
				marginTop: 24,
			},
			[theme.breakpoints.up('xl')]: {
				marginTop: 32,
			},
			['@media (min-width:3200px)']: {
				marginTop: 48,
			},
		},
		MarginL0:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginLeft: 72,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginLeft: 134,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginLeft: 161,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginLeft: 192,
			},
			[theme.breakpoints.up('xl')]: {
				marginLeft: 232,
			},
			['@media (min-width:3200px)']: {
				marginLeft: 464,
			},
		},
		MarginL1:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginLeft: 43,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginLeft: 86,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginLeft: 104,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginLeft: 124,
			},
			[theme.breakpoints.up('xl')]: {
				marginLeft: 150,
			},
			['@media (min-width:3200px)']: {
				marginLeft: 300,
			},
		},
		MarginL2:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginLeft: 34,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginLeft: 68,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginLeft: 80,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginLeft: 96,
			},
			[theme.breakpoints.up('xl')]: {
				marginLeft: 116,
			},
			['@media (min-width:3200px)']: {
				marginLeft: 232,
			},
		},
		MarginL3:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginLeft: 44,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginLeft: 52,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginLeft: 64,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginLeft: 76,
			},
			[theme.breakpoints.up('xl')]: {
				marginLeft: 92,
			},
			['@media (min-width:3200px)']: {
				marginLeft: 184,
			},
		},
		MarginL4:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginLeft: 34,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginLeft: 42,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginLeft: 48,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginLeft: 58,
			},
			[theme.breakpoints.up('xl')]: {
				marginLeft: 70,
			},
			['@media (min-width:3200px)']: {
				marginLeft: 140,
			},
		},
		MarginL5:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginLeft: 28,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginLeft: 34,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginLeft: 40,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginLeft: 48,
			},
			[theme.breakpoints.up('xl')]: {
				marginLeft: 58,
			},
			['@media (min-width:3200px)']: {
				marginLeft: 116,
			},
		},
		MarginL6:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginLeft: 28,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginLeft: 34,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginLeft: 42,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginLeft: 50,
			},
			[theme.breakpoints.up('xl')]: {
				marginLeft: 60,
			},
			['@media (min-width:3200px)']: {
				marginLeft: 120,
			},
		},
		MarginL7:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginLeft: 20,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginLeft: 24,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginLeft: 28,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginLeft: 34,
			},
			[theme.breakpoints.up('xl')]: {
				marginLeft: 42,
			},
			['@media (min-width:3200px)']: {
				marginLeft: 84,
			},
		},
		MarginL8:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginLeft: 16,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginLeft: 20,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginLeft: 24,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginLeft: 28,
			},
			[theme.breakpoints.up('xl')]: {
				marginLeft: 34,
			},
			['@media (min-width:3200px)']: {
				marginLeft: 64,
			},
		},
		MarginL9:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginLeft: 14,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginLeft: 16,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginLeft: 21,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginLeft: 24,
			},
			[theme.breakpoints.up('xl')]: {
				marginLeft: 28,
			},
			['@media (min-width:3200px)']: {
				marginLeft: 56,
			},

		},
		MarginL10:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginLeft: 12,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginLeft: 18,
			},
			[theme.breakpoints.between('md', 'xl')]: {
				marginLeft: 24,
			},
			[theme.breakpoints.up('xl')]: {
				marginLeft: 32,
			},
			['@media (min-width:3200px)']: {
				marginLeft: 48,
			},
		},
		MarginR0:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginRight: 112,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginRight: 134,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginRight: 161,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginRight: 192,
			},
			[theme.breakpoints.up('xl')]: {
				marginRight: 232,
			},
			['@media (min-width:3200px)']: {
				marginRight: 464,
			},
		},
		MarginR1:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginRight: 72,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginRight: 86,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginRight: 104,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginRight: 124,
			},
			[theme.breakpoints.up('xl')]: {
				marginRight: 150,
			},
			['@media (min-width:3200px)']: {
				marginRight: 300,
			},
		},
		MarginR2:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginRight: 56,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginRight: 68,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginRight: 80,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginRight: 96,
			},
			[theme.breakpoints.up('xl')]: {
				marginRight: 116,
			},
			['@media (min-width:3200px)']: {
				marginRight: 232,
			},
		},
		MarginR3:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginRight: 44,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginRight: 52,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginRight: 64,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginRight: 76,
			},
			[theme.breakpoints.up('xl')]: {
				marginRight: 92,
			},
			['@media (min-width:3200px)']: {
				marginRight: 184,
			},
		},
		MarginR4:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginRight: 34,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginRight: 42,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginRight: 48,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginRight: 58,
			},
			[theme.breakpoints.up('xl')]: {
				marginRight: 70,
			},
			['@media (min-width:3200px)']: {
				marginRight: 140,
			},
		},
		MarginR5:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginRight: 28,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginRight: 34,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginRight: 40,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginRight: 48,
			},
			[theme.breakpoints.up('xl')]: {
				marginRight: 58,
			},
			['@media (min-width:3200px)']: {
				marginRight: 116,
			},
		},
		MarginR6:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginRight: 28,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginRight: 34,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginRight: 42,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginRight: 50,
			},
			[theme.breakpoints.up('xl')]: {
				marginRight: 60,
			},
			['@media (min-width:3200px)']: {
				marginRight: 120,
			},
		},
		MarginR7:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginRight: 20,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginRight: 24,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginRight: 28,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginRight: 34,
			},
			[theme.breakpoints.up('xl')]: {
				marginRight: 42,
			},
			['@media (min-width:3200px)']: {
				marginRight: 84,
			},
		},
		MarginR8:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginRight: 16,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginRight: 20,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginRight: 24,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginRight: 28,
			},
			[theme.breakpoints.up('xl')]: {
				marginRight: 34,
			},
			['@media (min-width:3200px)']: {
				marginRight: 64,
			},
		},
		MarginR9:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginRight: 14,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginRight: 16,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginRight: 21,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginRight: 24,
			},
			[theme.breakpoints.up('xl')]: {
				marginRight: 28,
			},
			['@media (min-width:3200px)']: {
				marginRight: 56,
			},

		},
		MarginR10:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginRight: 12,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginRight: 18,
			},
			[theme.breakpoints.between('md', 'xl')]: {
				marginRight: 24,
			},
			[theme.breakpoints.up('xl')]: {
				marginRight: 32,
			},
			['@media (min-width:3200px)']: {
				marginRight: 48,
			},
		},
		MarginB0:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginBottom: 112,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginBottom: 134,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginBottom: 161,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginBottom: 192,
			},
			[theme.breakpoints.up('xl')]: {
				marginBottom: 232,
			},
			['@media (min-width:3200px)']: {
				marginBottom: 464,
			},
		},
		MarginB1:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginBottom: 72,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginBottom: 86,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginBottom: 104,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginBottom: 124,
			},
			[theme.breakpoints.up('xl')]: {
				marginBottom: 150,
			},
			['@media (min-width:3200px)']: {
				marginBottom: 300,
			},
		},
		MarginB2:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginBottom: 56,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginBottom: 68,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginBottom: 80,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginBottom: 96,
			},
			[theme.breakpoints.up('xl')]: {
				marginBottom: 116,
			},
			['@media (min-width:3200px)']: {
				marginBottom: 232,
			},
		},
		MarginB3:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginBottom: 44,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginBottom: 52,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginBottom: 64,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginBottom: 76,
			},
			[theme.breakpoints.up('xl')]: {
				marginBottom: 92,
			},
			['@media (min-width:3200px)']: {
				marginBottom: 184,
			},
		},
		MarginB4:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginBottom: 34,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginBottom: 42,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginBottom: 48,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginBottom: 58,
			},
			[theme.breakpoints.up('xl')]: {
				marginBottom: 70,
			},
			['@media (min-width:3200px)']: {
				marginBottom: 140,
			},
		},
		MarginB5:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginBottom: 28,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginBottom: 34,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginBottom: 40,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginBottom: 48,
			},
			[theme.breakpoints.up('xl')]: {
				marginBottom: 58,
			},
			['@media (min-width:3200px)']: {
				marginBottom: 116,
			},
		},
		MarginB6:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginBottom: 28,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginBottom: 34,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginBottom: 42,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginBottom: 50,
			},
			[theme.breakpoints.up('xl')]: {
				marginBottom: 60,
			},
			['@media (min-width:3200px)']: {
				marginBottom: 120,
			},
		},
		MarginB7:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginBottom: 20,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginBottom: 24,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginBottom: 28,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginBottom: 34,
			},
			[theme.breakpoints.up('xl')]: {
				marginBottom: 42,
			},
			['@media (min-width:3200px)']: {
				marginBottom: 84,
			},
		},
		MarginB8:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginBottom: 16,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginBottom: 20,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginBottom: 24,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginBottom: 28,
			},
			[theme.breakpoints.up('xl')]: {
				marginBottom: 34,
			},
			['@media (min-width:3200px)']: {
				marginBottom: 64,
			},
		},
		MarginB9:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginBottom: 14,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginBottom: 16,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				marginBottom: 21,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				marginBottom: 24,
			},
			[theme.breakpoints.up('xl')]: {
				marginBottom: 28,
			},
			['@media (min-width:3200px)']: {
				marginBottom: 56,
			},

		},
		MarginB10:{
			
			[theme.breakpoints.between('xs', 'sm')]: {
				marginBottom: 12,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				marginBottom: 18,
			},
			[theme.breakpoints.between('md', 'xl')]: {
				marginBottom: 24,
			},
			[theme.breakpoints.up('xl')]: {
				marginBottom: 32,
			},
			['@media (min-width:3200px)']: {
				marginBottom: 48,
			},
		},
		Display0:{
			fontWeight:400,
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 134,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 161,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 161,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 192,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 232,
			},
			['@media (min-width:3200px)']: {
				fontSize: 464,
			},
		},
		Display1:{
			fontWeight:400,
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 86,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 104,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 104,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 124,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 150,
			},
			['@media (min-width:3200px)']: {
				fontSize: 300,
			},
		},
		Display2:{
			fontWeight:400,
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 66,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 80,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 80,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 96,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 116,
			},
			['@media (min-width:3200px)']: {
				fontSize: 232,
			},
		},
		Display3:{
			fontWeight:400,
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 54,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 64,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 64,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 76,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 92,
			},
			['@media (min-width:3200px)']: {
				fontSize: 184,
			},
		},
		Display4:{
			fontWeight:400,
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 40,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 48,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 48,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 58,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 70,
			},
			['@media (min-width:3200px)']: {
				fontSize: 140,
			},
		},
		Display5:{
			fontWeight:400,
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 32,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 40,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 40,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 48,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 58,
			},
			['@media (min-width:3200px)']: {
				fontSize: 116,
			},
		},
		Display6:{
			fontWeight:400,
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 30,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 36,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 36,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 44,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 54,
			},
			['@media (min-width:3200px)']: {
				fontSize: 106,
			},
		},
		Display7:{
			fontWeight:400,
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 24,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 28,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 28,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 34,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 42,
			},
			['@media (min-width:3200px)']: {
				fontSize: 84,
			},
		},
		Display8:{
			fontWeight:400,
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 22,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 26,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 26,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 28,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 32,
			},
			['@media (min-width:3200px)']: {
				fontSize: 64,
			},
		},
		Display9:{
			fontWeight:400,
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			//fontFamily:'ANC,SourceHanSansCN-Light, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 20,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 24,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 24,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 24,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 30,
			},
			['@media (min-width:3200px)']: {
				fontSize: 56,
			},

		},
		Display10:{
			fontWeight:400,
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 18,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 18,
			},
			[theme.breakpoints.between('md', 'xl')]: {
				fontSize: 20,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 22,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 26,
			},
			['@media (min-width:3200px)']: {
				fontSize: 48,
			},
		},
		Display11:{
			fontWeight:400,
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 16,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 18,
			},
			[theme.breakpoints.between('md', 'xl')]: {
				fontSize: 20,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 24,
			},
			['@media (min-width:3200px)']: {
				fontSize: 48,
			},
		},
		Display11x:{
			fontWeight:400,
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 14,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 18,
			},
			[theme.breakpoints.between('md', 'xl')]: {
				fontSize: 20,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 24,
			},
			['@media (min-width:3200px)']: {
				fontSize: 48,
			},
		},
		Display11s:{
			fontWeight:400,
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 16,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 18,
			},
			[theme.breakpoints.between('md', 'xl')]: {
				fontSize: 18,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 22,
			},
			['@media (min-width:3200px)']: {
				fontSize: 40,
			},
		},
		DisplaySeBold0:{
			fontWeight:600,
			fontFamily:'ANC-SeBold,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 134,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 161,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 161,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 192,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 232,
			},
			['@media (min-width:3200px)']: {
				fontSize: 464,
			},
		},
		DisplaySeBold1:{
			fontWeight:600,
			fontFamily:'ANC-SeBold,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 86,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 104,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 104,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 124,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 150,
			},
			['@media (min-width:3200px)']: {
				fontSize: 300,
			},
		},
		DisplaySeBold2:{
			fontWeight:600,
			fontFamily:'ANC-SeBold,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 66,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 80,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 80,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 96,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 116,
			},
			['@media (min-width:3200px)']: {
				fontSize: 232,
			},
		},
		DisplaySeBold3:{
			fontWeight:600,
			fontFamily:'ANC-SeBold,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 54,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 64,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 64,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 76,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 92,
			},
			['@media (min-width:3200px)']: {
				fontSize: 184,
			},
		},
		DisplaySeBold4:{
			fontWeight:600,
			fontFamily:'ANC-SeBold,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 40,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 48,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 48,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 58,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 70,
			},
			['@media (min-width:3200px)']: {
				fontSize: 140,
			},
		},
		DisplaySeBold5:{
			fontWeight:600,
			fontFamily:'ANC-SeBold,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 32,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 40,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 40,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 48,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 58,
			},
			['@media (min-width:3200px)']: {
				fontSize: 116,
			},
		},
		DisplaySeBold6:{
			fontWeight:600,
			fontFamily:'ANC-SeBold,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 30,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 36,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 36,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 44,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 54,
			},
			['@media (min-width:3200px)']: {
				fontSize: 106,
			},
		},
		DisplaySeBold7:{
			fontWeight:600,
			fontFamily:'ANC-SeBold,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 24,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 28,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 28,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 34,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 42,
			},
			['@media (min-width:3200px)']: {
				fontSize: 84,
			},
		},
		DisplaySeBold8:{
			fontWeight:600,
			fontFamily:'ANC-SeBold,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 22,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 26,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 26,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 28,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 32,
			},
			['@media (min-width:3200px)']: {
				fontSize: 64,
			},
		},
		DisplaySeBold9:{
			fontWeight:600,
			fontFamily:'ANC-SeBold,source-han-sans-simplified-c, sans-serif',
			//fontFamily:'ANC-SeBold,SourceHanSansCN-Light, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 20,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 24,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 24,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 26,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 30,
			},
			['@media (min-width:3200px)']: {
				fontSize: 56,
			},

		},
		DisplaySeBold10:{
			fontWeight:600,
			fontFamily:'ANC-SeBold,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 18,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 18,
			},
			[theme.breakpoints.between('md', 'xl')]: {
				fontSize: 20,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 22,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 26,
			},
			['@media (min-width:3200px)']: {
				fontSize: 48,
			},
		},
		DisplaySeBold11:{
			fontWeight:600,
			fontFamily:'ANC-SeBold,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 16,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 18,
			},
			[theme.breakpoints.between('md', 'xl')]: {
				fontSize: 20,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 24,
			},
			['@media (min-width:3200px)']: {
				fontSize: 48,
			},
		},
		DisplaySeBold11x:{
			fontWeight:600,
			fontFamily:'ANC-SeBold,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 14,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 18,
			},
			[theme.breakpoints.between('md', 'xl')]: {
				fontSize: 20,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 24,
			},
			['@media (min-width:3200px)']: {
				fontSize: 48,
			},
		},
		DisplaySeBold11s:{
			fontWeight:600,
			fontFamily:'ANC-SeBold,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 16,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 18,
			},
			[theme.breakpoints.between('md', 'xl')]: {
				fontSize: 18,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 20,
			},
			['@media (min-width:3200px)']: {
				fontSize: 40,
			},
		},
		DisplayLight0:{
			fontFamily:'ANC-Light,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 134,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 161,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 161,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 192,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 232,
			},
			['@media (min-width:3200px)']: {
				fontSize: 464,
			},
		},
		DisplayLight1:{
			fontFamily:'ANC-Light,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 86,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 104,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 104,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 124,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 150,
			},
			['@media (min-width:3200px)']: {
				fontSize: 300,
			},
		},
		DisplayLight2:{
			fontFamily:'ANC-Light,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 66,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 80,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 80,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 96,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 116,
			},
			['@media (min-width:3200px)']: {
				fontSize: 232,
			},
		},
		DisplayLight3:{
			fontFamily:'ANC-Light,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 54,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 64,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 64,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 76,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 92,
			},
			['@media (min-width:3200px)']: {
				fontSize: 184,
			},
		},
		DisplayLight4:{
			fontFamily:'ANC-Light,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 40,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 48,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 48,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 58,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 70,
			},
			['@media (min-width:3200px)']: {
				fontSize: 140,
			},
		},
		DisplayLight5:{
			fontFamily:'ANC-Light,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 32,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 40,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 40,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 48,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 58,
			},
			['@media (min-width:3200px)']: {
				fontSize: 116,
			},
		},
		DisplayLight6:{
			fontFamily:'ANC-Light,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 30,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 36,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 36,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 44,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 54,
			},
			['@media (min-width:3200px)']: {
				fontSize: 106,
			},
		},
		DisplayLight7:{
			fontFamily:'ANC-Light,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 24,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 28,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 28,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 34,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 42,
			},
			['@media (min-width:3200px)']: {
				fontSize: 84,
			},
		},
		DisplayLight8:{
			fontFamily:'ANC-Light,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 22,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 26,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 26,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 28,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 32,
			},
			['@media (min-width:3200px)']: {
				fontSize: 64,
			},
		},
		DisplayLight9:{
			fontFamily:'ANC-Light,source-han-sans-simplified-c, sans-serif',
			//fontFamily:'ANC-Light,SourceHanSansCN-Light, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 20,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 24,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 24,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 26,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 30,
			},
			['@media (min-width:3200px)']: {
				fontSize: 56,
			},

		},
		DisplayLight10:{
			fontFamily:'ANC-Light,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 18,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 18,
			},
			[theme.breakpoints.between('md', 'xl')]: {
				fontSize: 20,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 22,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 26,
			},
			['@media (min-width:3200px)']: {
				fontSize: 48,
			},
		},
		DisplayLight11:{
			fontFamily:'ANC-Light,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 16,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 18,
			},
			[theme.breakpoints.between('md', 'xl')]: {
				fontSize: 20,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 24,
			},
			['@media (min-width:3200px)']: {
				fontSize: 48,
			},
		},
		DisplayLight11x:{
			fontFamily:'ANC-Light,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 14,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 18,
			},
			[theme.breakpoints.between('md', 'xl')]: {
				fontSize: 20,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 24,
			},
			['@media (min-width:3200px)']: {
				fontSize: 48,
			},
		},
		DisplayLight11s:{
			fontFamily:'ANC-Light,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 16,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 18,
			},
			[theme.breakpoints.between('md', 'xl')]: {
				fontSize: 18,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 22,
			},
			['@media (min-width:3200px)']: {
				fontSize: 40,
			},
		},
		DisplayLight12s:{
			fontFamily:'ANC-Light,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 14,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 16,
			},
			[theme.breakpoints.between('md', 'xl')]: {
				fontSize: 16,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 16,
			},
			['@media (min-width:3200px)']: {
				fontSize: 32,
			},
		},
		PaddingL0:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingLeft: 72,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingLeft: 134,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingLeft: 161,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingLeft: 192,
			},
			[theme.breakpoints.up('xl')]: {
				paddingLeft: 232,
			},
			['@media (min-width:3200px)']: {
				paddingLeft: 464,
			},
		},
		PaddingL1:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingLeft: 43,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingLeft: 86,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingLeft: 104,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingLeft: 124,
			},
			[theme.breakpoints.up('xl')]: {
				paddingLeft: 150,
			},
			['@media (min-width:3200px)']: {
				paddingLeft: 300,
			},
		},
		PaddingL2:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingLeft: 34,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingLeft: 68,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingLeft: 80,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingLeft: 96,
			},
			[theme.breakpoints.up('xl')]: {
				paddingLeft: 116,
			},
			['@media (min-width:3200px)']: {
				paddingLeft: 232,
			},
		},
		PaddingL3:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingLeft: 26,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingLeft: 52,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingLeft: 64,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingLeft: 76,
			},
			[theme.breakpoints.up('xl')]: {
				paddingLeft: 92,
			},
			['@media (min-width:3200px)']: {
				paddingLeft: 184,
			},
		},
		PaddingL4:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingLeft: 21,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingLeft: 42,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingLeft: 48,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingLeft: 58,
			},
			[theme.breakpoints.up('xl')]: {
				paddingLeft: 70,
			},
			['@media (min-width:3200px)']: {
				paddingLeft: 140,
			},
		},
		PaddingL5:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingLeft: 17,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingLeft: 34,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingLeft: 40,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingLeft: 48,
			},
			[theme.breakpoints.up('xl')]: {
				paddingLeft: 58,
			},
			['@media (min-width:3200px)']: {
				paddingLeft: 116,
			},
		},
		PaddingL6:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingLeft: 17,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingLeft: 34,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingLeft: 38,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingLeft: 42,
			},
			[theme.breakpoints.up('xl')]: {
				paddingLeft: 50,
			},
			['@media (min-width:3200px)']: {
				paddingLeft: 100,
			},
		},
		PaddingL7:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingLeft: 12,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingLeft: 24,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingLeft: 28,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingLeft: 34,
			},
			[theme.breakpoints.up('xl')]: {
				paddingLeft: 42,
			},
			['@media (min-width:3200px)']: {
				paddingLeft: 84,
			},
		},
		PaddingL8:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingLeft: 10,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingLeft: 20,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingLeft: 24,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingLeft: 28,
			},
			[theme.breakpoints.up('xl')]: {
				paddingLeft: 34,
			},
			['@media (min-width:3200px)']: {
				paddingLeft: 64,
			},
		},
		PaddingL9:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingLeft: 8,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingLeft: 16,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingLeft: 21,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingLeft: 24,
			},
			[theme.breakpoints.up('xl')]: {
				paddingLeft: 28,
			},
			['@media (min-width:3200px)']: {
				paddingLeft: 56,
			},

		},
		PaddingL10:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingLeft: 9,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingLeft: 18,
			},
			[theme.breakpoints.between('md', 'xl')]: {
				paddingLeft: 24,
			},
			[theme.breakpoints.up('xl')]: {
				paddingLeft: 32,
			},
			['@media (min-width:3200px)']: {
				paddingLeft: 48,
			},
		},
		PaddingR0:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingRight: 112,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingRight: 134,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingRight: 161,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingRight: 192,
			},
			[theme.breakpoints.up('xl')]: {
				paddingRight: 232,
			},
			['@media (min-width:3200px)']: {
				paddingRight: 464,
			},
		},
		PaddingR1:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingRight: 72,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingRight: 86,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingRight: 104,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingRight: 124,
			},
			[theme.breakpoints.up('xl')]: {
				paddingRight: 150,
			},
			['@media (min-width:3200px)']: {
				paddingRight: 300,
			},
		},
		PaddingR2:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingRight: 56,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingRight: 68,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingRight: 80,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingRight: 96,
			},
			[theme.breakpoints.up('xl')]: {
				paddingRight: 116,
			},
			['@media (min-width:3200px)']: {
				paddingRight: 232,
			},
		},
		PaddingR3:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingRight: 44,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingRight: 52,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingRight: 64,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingRight: 76,
			},
			[theme.breakpoints.up('xl')]: {
				paddingRight: 92,
			},
			['@media (min-width:3200px)']: {
				paddingRight: 184,
			},
		},
		PaddingR4:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingRight: 34,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingRight: 42,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingRight: 48,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingRight: 58,
			},
			[theme.breakpoints.up('xl')]: {
				paddingRight: 70,
			},
			['@media (min-width:3200px)']: {
				paddingRight: 140,
			},
		},
		PaddingR5:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingRight: 28,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingRight: 34,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingRight: 40,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingRight: 48,
			},
			[theme.breakpoints.up('xl')]: {
				paddingRight: 58,
			},
			['@media (min-width:3200px)']: {
				paddingRight: 116,
			},
		},
		PaddingR6:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingRight: 28,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingRight: 34,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingRight: 42,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingRight: 50,
			},
			[theme.breakpoints.up('xl')]: {
				paddingRight: 60,
			},
			['@media (min-width:3200px)']: {
				paddingRight: 120,
			},
		},
		PaddingR7:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingRight: 20,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingRight: 24,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingRight: 28,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingRight: 34,
			},
			[theme.breakpoints.up('xl')]: {
				paddingRight: 42,
			},
			['@media (min-width:3200px)']: {
				paddingRight: 84,
			},
		},
		PaddingR8:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingRight: 16,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingRight: 20,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingRight: 24,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingRight: 28,
			},
			[theme.breakpoints.up('xl')]: {
				paddingRight: 34,
			},
			['@media (min-width:3200px)']: {
				paddingRight: 64,
			},
		},
		PaddingR9:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingRight: 14,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingRight: 16,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingRight: 21,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingRight: 24,
			},
			[theme.breakpoints.up('xl')]: {
				paddingRight: 28,
			},
			['@media (min-width:3200px)']: {
				paddingRight: 56,
			},

		},
		PaddingR10:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingRight: 12,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingRight: 18,
			},
			[theme.breakpoints.between('md', 'xl')]: {
				paddingRight: 24,
			},
			[theme.breakpoints.up('xl')]: {
				paddingRight: 32,
			},
			['@media (min-width:3200px)']: {
				paddingRight: 48,
			},
		},
		PaddingT0:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingTop: 112,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingTop: 134,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingTop: 161,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingTop: 192,
			},
			[theme.breakpoints.up('xl')]: {
				paddingTop: 232,
			},
			['@media (min-width:3200px)']: {
				paddingTop: 464,
			},
		},
		PaddingT1:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingTop: 72,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingTop: 86,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingTop: 104,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingTop: 124,
			},
			[theme.breakpoints.up('xl')]: {
				paddingTop: 150,
			},
			['@media (min-width:3200px)']: {
				paddingTop: 300,
			},
		},
		PaddingT2:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingTop: 56,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingTop: 68,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingTop: 80,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingTop: 96,
			},
			[theme.breakpoints.up('xl')]: {
				paddingTop: 116,
			},
			['@media (min-width:3200px)']: {
				paddingTop: 232,
			},
		},
		PaddingT3:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingTop: 44,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingTop: 52,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingTop: 64,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingTop: 76,
			},
			[theme.breakpoints.up('xl')]: {
				paddingTop: 92,
			},
			['@media (min-width:3200px)']: {
				paddingTop: 184,
			},
		},
		PaddingT4:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingTop: 34,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingTop: 42,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingTop: 48,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingTop: 58,
			},
			[theme.breakpoints.up('xl')]: {
				paddingTop: 70,
			},
			['@media (min-width:3200px)']: {
				paddingTop: 140,
			},
		},
		PaddingT5:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingTop: 28,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingTop: 34,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingTop: 40,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingTop: 48,
			},
			[theme.breakpoints.up('xl')]: {
				paddingTop: 58,
			},
			['@media (min-width:3200px)']: {
				paddingTop: 116,
			},
		},
		PaddingT6:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingTop: 28,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingTop: 34,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingTop: 42,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingTop: 50,
			},
			[theme.breakpoints.up('xl')]: {
				paddingTop: 60,
			},
			['@media (min-width:3200px)']: {
				paddingTop: 120,
			},
		},
		PaddingT7:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingTop: 20,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingTop: 24,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingTop: 28,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingTop: 34,
			},
			[theme.breakpoints.up('xl')]: {
				paddingTop: 42,
			},
			['@media (min-width:3200px)']: {
				paddingTop: 84,
			},
		},
		PaddingT8:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingTop: 16,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingTop: 20,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingTop: 24,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingTop: 28,
			},
			[theme.breakpoints.up('xl')]: {
				paddingTop: 34,
			},
			['@media (min-width:3200px)']: {
				paddingTop: 64,
			},
		},
		PaddingT9:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingTop: 14,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingTop: 16,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingTop: 21,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingTop: 24,
			},
			[theme.breakpoints.up('xl')]: {
				paddingTop: 28,
			},
			['@media (min-width:3200px)']: {
				paddingTop: 56,
			},

		},
		PaddingT10:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingTop: 12,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingTop: 18,
			},
			[theme.breakpoints.between('md', 'xl')]: {
				paddingTop: 24,
			},
			[theme.breakpoints.up('xl')]: {
				paddingTop: 32,
			},
			['@media (min-width:3200px)']: {
				paddingTop: 48,
			},
		},
		PaddingB0:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingBottom: 112,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingBottom: 134,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingBottom: 161,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingBottom: 192,
			},
			[theme.breakpoints.up('xl')]: {
				paddingBottom: 232,
			},
			['@media (min-width:3200px)']: {
				paddingBottom: 464,
			},
		},
		PaddingB1:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingBottom: 72,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingBottom: 86,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingBottom: 104,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingBottom: 124,
			},
			[theme.breakpoints.up('xl')]: {
				paddingBottom: 150,
			},
			['@media (min-width:3200px)']: {
				paddingBottom: 300,
			},
		},
		PaddingB2:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingBottom: 56,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingBottom: 68,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingBottom: 80,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingBottom: 96,
			},
			[theme.breakpoints.up('xl')]: {
				paddingBottom: 116,
			},
			['@media (min-width:3200px)']: {
				paddingBottom: 232,
			},
		},
		PaddingB3:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingBottom: 44,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingBottom: 52,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingBottom: 64,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingBottom: 76,
			},
			[theme.breakpoints.up('xl')]: {
				paddingBottom: 92,
			},
			['@media (min-width:3200px)']: {
				paddingBottom: 184,
			},
		},
		PaddingB4:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingBottom: 34,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingBottom: 42,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingBottom: 48,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingBottom: 58,
			},
			[theme.breakpoints.up('xl')]: {
				paddingBottom: 70,
			},
			['@media (min-width:3200px)']: {
				paddingBottom: 140,
			},
		},
		PaddingB5:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingBottom: 28,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingBottom: 34,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingBottom: 40,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingBottom: 48,
			},
			[theme.breakpoints.up('xl')]: {
				paddingBottom: 58,
			},
			['@media (min-width:3200px)']: {
				paddingBottom: 116,
			},
		},
		PaddingB6:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingBottom: 28,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingBottom: 34,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingBottom: 42,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingBottom: 50,
			},
			[theme.breakpoints.up('xl')]: {
				paddingBottom: 60,
			},
			['@media (min-width:3200px)']: {
				paddingBottom: 120,
			},
		},
		PaddingB7:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingBottom: 20,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingBottom: 24,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingBottom: 28,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingBottom: 34,
			},
			[theme.breakpoints.up('xl')]: {
				paddingBottom: 42,
			},
			['@media (min-width:3200px)']: {
				paddingBottom: 84,
			},
		},
		PaddingB8:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingBottom: 16,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingBottom: 20,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingBottom: 24,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingBottom: 28,
			},
			[theme.breakpoints.up('xl')]: {
				paddingBottom: 34,
			},
			['@media (min-width:3200px)']: {
				paddingBottom: 64,
			},
		},
		PaddingB9:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingBottom: 14,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingBottom: 16,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				paddingBottom: 21,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				paddingBottom: 24,
			},
			[theme.breakpoints.up('xl')]: {
				paddingBottom: 28,
			},
			['@media (min-width:3200px)']: {
				paddingBottom: 56,
			},

		},
		PaddingB10:{
			fontFamily:'ANC,source-han-sans-simplified-c, sans-serif',
			[theme.breakpoints.between('xs', 'sm')]: {
				paddingBottom: 12,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				paddingBottom: 18,
			},
			[theme.breakpoints.between('md', 'xl')]: {
				paddingBottom: 24,
			},
			[theme.breakpoints.up('xl')]: {
				paddingBottom: 32,
			},
			['@media (min-width:3200px)']: {
				paddingBottom: 48,
			},
		},

		h1: {
			fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
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
			fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
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
			fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
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
			fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
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
			fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
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
			fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
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
			fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
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
			fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
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
			fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
			
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
		btnMini: {
			fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
			backgroundColor: '#EF8F71',
			color:'#FFFFFF',
			borderColor: '#EF8F71',
			borderWidth: 2,
			borderStyle:'solid',
			borderRadius: '100vw',
			paddingTop: 10,
			paddingBottom: 10,
			fontWeight:400,
			lineHeight:1,
			'&:hover':{
				color: '#EF8F71',
				borderColor: '#FF774A',
				borderWidth: 2,
			},
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 14,
				paddingRight: 12,
				paddingLeft: 12,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 16,
				paddingRight: 14,
				paddingLeft: 14,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 16,
				paddingRight: 14,
				paddingLeft: 14,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 20,
				paddingRight: 20,
				paddingLeft: 20,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 22,
				paddingRight: 20,
				paddingLeft: 20,
			},
			['@media (min-width:3200px)']: {
				fontSize: 48,
				paddingRight: 40,
				paddingLeft: 40,
				paddingBottom: 20,
				paddingTop: 20,
			},
		},
		btn: {
			fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
			backgroundColor: '#EF8F71',
			color:'#FFFFFF',
			borderColor: '#EF8F71',
			borderWidth: 2,
			borderStyle:'solid',
			borderRadius: '100vw',
			paddingTop: 10,
			paddingBottom: 10,
			fontWeight:400,
			lineHeight:1,
			'&:hover':{
				color: '#FF774A',
				borderColor: '#FF774A',
				borderWidth: 2,
			},
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 16,
				paddingRight: 16,
				paddingLeft: 16,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 16,
				paddingRight: 20,
				paddingLeft: 20,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 20,
				paddingRight: 24,
				paddingLeft: 24,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 24,
				paddingRight: 28,
				paddingLeft: 28,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 28,
				paddingRight: 34,
				paddingLeft: 34,
			},
			['@media (min-width:3200px)']: {
				fontSize: 56,
				paddingRight: 64,
				paddingLeft: 64,
				paddingTop: 20,
				paddingBottom: 20,

			},
		},
		btnBig: {
			fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
			backgroundColor: '#FF7744',
			color:'#FFFFFF',
			borderColor: '#FF774A',
			borderWidth: 2,
			borderStyle:'solid',
			borderRadius: '100vw',
			paddingTop: 10,
			paddingBottom: 10,
			fontWeight:400,
			lineHeight:1,
			'&:hover':{
				color: '#FF774A',
				borderColor: '#FFFFFF',
				borderWidth: 2,
			},
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 16,
				paddingRight: 16,
				paddingLeft: 16,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 20,
				paddingRight: 20,
				paddingLeft: 20,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 24,
				paddingRight: 24,
				paddingLeft: 24,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 28,
				paddingRight: 34,
				paddingLeft: 34,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 34,
				paddingRight: 34,
				paddingLeft: 34,
			},
			['@media (min-width:3200px)']: {
				fontSize: 78,
				paddingRight: 78,
				paddingLeft: 78,
				paddingBottom: 20,
				paddingTop: 20,
			},
		},
		btnOutlineMini: {
			whiteSpace:'nowrap',
			// marginTop: theme.spacing(3),
			fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
			color: '#FF774A',
			borderColor: '#FF774A',
			borderWidth: 2,
			borderRadius: '100vw',
			paddingLeft: 20,
			paddingRight: 20,
			fontWeight:400,
			paddingTop: 10,
			borderStyle:'solid',
			paddingBottom: 10,
			lineHeight:1,
			'&:hover':{
				color: '#FF774A',
				borderColor: '#FF774A',
				borderWidth: 2,
			},
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 14,
				paddingRight: 12,
				paddingLeft: 12,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 16,
				paddingRight: 14,
				paddingLeft: 14,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 16,
				paddingRight: 14,
				paddingLeft: 14,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 18,
				paddingRight: 18,
				paddingLeft: 18,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 22,
				paddingRight: 20,
				paddingLeft: 20,
			},
			['@media (min-width:3200px)']: {
				fontSize: 48,
				paddingRight: 40,
				paddingLeft: 40,
				paddingBottom: 20,
				paddingTop: 20,
			},
		},
		btnOutline: {
			whiteSpace:'nowrap',
			// marginTop: theme.spacing(3),
			fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
			color: '#FF774A',
			borderColor: '#FF774A',
			borderWidth: 2,
			borderRadius: '100vw',
			paddingLeft: 20,
			paddingRight: 20,
			fontWeight:500,
			paddingTop: 10,
			borderStyle:'solid',
			paddingBottom: 10,
			lineHeight:1,
			'&:hover':{
				color: '#FFFFFF',
				backgroundColor: '#FF774A',
				borderColor: '#FFFFFF',
				borderWidth: 2,
			},
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 16,
				paddingRight: 16,
				paddingLeft: 16,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 16,
				paddingRight: 20,
				paddingLeft: 20,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 21,
				paddingRight: 24,
				paddingLeft: 24,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 24,
				paddingRight: 28,
				paddingLeft: 28,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 28,
				paddingRight: 34,
				paddingLeft: 34,
			},
			['@media (min-width:3200px)']: {
				fontSize: 56,
				paddingRight: 64,
				paddingLeft: 64,
				paddingBottom: 20,
				paddingTop: 20,
			},
		},
		btnColor:{
			whiteSpace:'nowrap',
			fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
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
				fontSize: 14,
				paddingRight: 16,
				paddingLeft: 16,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 16,
				paddingRight: 20,
				paddingLeft: 20,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 21,
				paddingRight: 24,
				paddingLeft: 24,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 24,
				paddingRight: 28,
				paddingLeft: 28,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 28,
				paddingRight: 34,
				paddingLeft: 34,
			},
			['@media (min-width:3200px)']: {
				fontSize: 56,
				paddingRight: 64,
				paddingLeft: 64,
			},
		},
		btnColor2:{
			fontWeight:500,
			whiteSpace:'nowrap',
			fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
			backgroundColor: 'rgb(255,241,235)',
			boxShadow: '0px 2px 2px #ff7d57',
			borderWidth: 2,
			borderRadius: '100vw',
			paddingLeft: 32,
			paddingRight: 32,
			color: 'rgb(255,118,67)',
			paddingTop: 4,
			paddingBottom: 4,
			'&:hover':{
				color: '#FFFFFF',
				backgroundColor: 'rgb(255,182,164)',
				borderColor: '#FFFFFF',
				borderWidth: 2,
			},
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 14,
				paddingRight: 16,
				paddingLeft: 16,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 16,
				paddingRight: 20,
				paddingLeft: 20,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 21,
				paddingRight: 24,
				paddingLeft: 24,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 24,
				paddingRight: 28,
				paddingLeft: 28,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 28,
				paddingRight: 34,
				paddingLeft: 34,
			},
			['@media (min-width:3200px)']: {
				fontSize: 56,
				paddingRight: 64,
				paddingLeft: 64,
			},
		},
		btnColor3:{
			whiteSpace:'nowrap',
			fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
			backgroundColor: '#FFFFFF',
			borderWidth: 2,
			borderRadius: '100vw',
			borderColor :'#FF774A',
			paddingLeft: 32,
			paddingRight: 32,
			color: '#FF774A',
			paddingTop: 4,
			paddingBottom: 4,
			marginRight: 5,
			fontWeight:500,
			'&:hover':{
				color: '#FFFFFF',
				backgroundColor: '#FF774A',
				borderWidth: 2,
			},
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 14,
				paddingRight: 16,
				paddingLeft: 16,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 16,
				paddingRight: 20,
				paddingLeft: 20,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 21,
				paddingRight: 24,
				paddingLeft: 24,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 24,
				paddingRight: 28,
				paddingLeft: 28,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 28,
				paddingRight: 34,
				paddingLeft: 34,
			},
			['@media (min-width:3200px)']: {
				fontSize: 56,
				paddingRight: 64,
				paddingLeft: 64,
			},
		},
		btnColor3Mini:{
			whiteSpace:'nowrap',
			fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
			backgroundColor: '#FFFFFF',
			borderWidth: 2,
			borderRadius: '100vw',
			borderColor :'#FF774A',
			paddingLeft: 32,
			paddingRight: 32,
			color: '#FF774A',
			paddingTop: 3,
			paddingBottom: 3,
			marginRight: 5,
			'&:hover':{
				color: '#FFFFFF',
				backgroundColor: '#FF774A',
				borderWidth: 2,
			},
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 14,
				paddingRight: 16,
				paddingLeft: 16,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 16,
				paddingRight: 20,
				paddingLeft: 20,
			},
			[theme.breakpoints.between('md', 'lg')]: {
				fontSize: 18,
				paddingRight: 24,
				paddingLeft: 24,
			},
			[theme.breakpoints.between('lg', 'xl')]: {
				fontSize: 20,
				paddingRight: 28,
				paddingLeft: 28,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 22,
				paddingRight: 34,
				paddingLeft: 34,
			},
			['@media (min-width:3200px)']: {
				fontSize: 44,
				paddingRight: 64,
				paddingLeft: 64,
			},
		},
		btnTopBarMenu:{
			whiteSpace:'nowrap',
			fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
			backgroundColor: '#FFFFFF',
			borderWidth: 2,
			borderRadius: '100vw',
			borderColor :'#FF774A',

			color: '#FF774A',
			paddingTop: 0,
			paddingBottom: 0,
			'&:hover':{
				color: '#FFFFFF',
				backgroundColor: '#FF774A',
			
				borderWidth: 2,
			},
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 14,
				paddingLeft: 10,
				paddingRight: 10,
				
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 16,
				paddingLeft: 16,
				paddingRight: 16,
			},
			[theme.breakpoints.between('md', 'xl')]: {
				fontSize: 20,
				paddingLeft: 20,
				paddingRight: 20,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 24,
				paddingLeft: 32,
				paddingRight: 32,
			},
			['@media (min-width:3200px)']: {
				fontSize: 48,
				paddingLeft: 32,
				paddingRight: 32,
			},
		},
		btnItem:{
			whiteSpace:'nowrap',
			fontFamily: 'ANC,source-han-sans-simplified-c, sans-serif',
			color: 'rgb(255,119,68)',
			paddingTop: 0,
			paddingBottom: 0,
			'&:hover':{
				color:'rgb(255,119,68)',
				backgroundColor:'#FFFFFF'
			},
			[theme.breakpoints.between('xs', 'sm')]: {
				fontSize: 14,
				paddingLeft: 10,
				paddingRight: 10,
			},
			[theme.breakpoints.between('sm', 'md')]: {
				fontSize: 16,
				paddingLeft: 16,
				paddingRight: 16,
			},
			[theme.breakpoints.between('md', 'xl')]: {
				fontSize: 20,
				paddingLeft: 20,
				paddingRight: 20,
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: 24,
				paddingLeft: 32,
				paddingRight: 32,
			},
			['@media (min-width:3200px)']: {
				fontSize: 48,
				paddingLeft: 32,
				paddingRight: 32,
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
			width:'36px',
			[theme.breakpoints.between('xs', 'sm')]: {
				width:'36px',
			},
			[theme.breakpoints.up('xl')]: {
				width:'48px',
			},
			['@media (min-width:3200px)']: {
				width:'96px',
			},
		},
		btnImgRound:{
			display:'flex',
			justifyContent:'center'
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
			if(oldStyle[styleKey]['inherit']){
				let inkeys = oldStyle[styleKey]['inherit'].split(',');
				
				for(let inkey of inkeys){
					if(commonStyle[inkey]){
						for(let style of Object.keys(commonStyle[inkey])){
							if(style.indexOf('@media')!=-1){
								if(!retObject[styleKey][style]){
									retObject[styleKey][style] = new Object();
								}
								for(let i of Object.keys(commonStyle[inkey][style])){
									retObject[styleKey][style][i] = commonStyle[inkey][style][i]
								}
								//console.log(retObject);
							}else{
								retObject[styleKey][style] = commonStyle[inkey][style]
							}	
						}
					}
				}
			}
		}
		return retObject
	}
	return newStyle
}

export default withCommon;

