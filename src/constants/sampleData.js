import React from 'react'

export const Samplechats=[{
	avatar:["https://www.w3schools.com/howto/img_avatar.png"],
	name:"RAJEEV",
	_id:"1",
	groupChat:false,
	members:["1","2"],
},
{
	avatar:["https://www.w3schools.com/howto/img_avatar.png",
		
		
	],
	name:"RAJveer",
	_id:"2",
	groupChat:true,
	members:["1","2"],
},
]

export const sampleUsers=[
	{
	avatar:["https://www.w3schools.com/howto/img_avatar.png"],
	name:"RAJEEV",
	_id:"1",
	},
	{
	avatar:["https://www.w3schools.com/howto/img_avatar.png"],
	name:"RAJkauamr",
	_id:"2",
	}
	,
	
]

export const sampleNotifications=[
	{sender:{
		avatar:["https://www.w3schools.com/howto/img_avatar.png"],
		name:"RAJEEV",
		},
		_id:"1",
	},

	{sender:{
		avatar:["https://www.w3schools.com/howto/img_avatar.png"],
		name:"RAJEEVeer",
		},
		_id:"2",
	}
]

export const sampleMessage=[
	{
		attachments:[
			{
				public_id:"asdf",
				url:"https://www.w3schools.com/howto/img_avatar.png",
			},
		],
		content:"ljlkjla ka mess",
		_id:"rajeevkumarranjan",
		sender:{
			_id:"user._id",
			name:"satwik",
		},
		chat:"chatId",
		createdAt:"2024-02-12T10:41:30.630Z",
	},
	{
		attachments:[],
		content:"i rajev",
		_id:"rajeevkumarranjan2",
		sender:{
			_id:"abcde",
			name:"satwik2",
		},
		chat:"chatId2",
		createdAt:"2024-02-12T10:41:30.630Z",
	},
]

export const dashboardData={
	users:[{
		avatar:["https://www.w3schools.com/howto/img_avatar.png"],
		name:"RAJEEV",
		_id:"1",
		username:"rkr",
		friends:20,
		groups:5,
		},
		{
			avatar:["https://www.w3schools.com/howto/img_avatar.png"],
			name:"Aditi",
			_id:"2",
			username:"adi",
			friends:20,
			groups:25,
			},
	],
	chats:[
		{
		name:"Rajeev",
		avatar:["https://www.w3schools.com/howto/img_avatar.png"],
		_id:"1",
		groupChat:false,
		members:[
			{
				_id:"1",avatar:"https://www.w3schools.com/howto/img_avatar.png"
			},
			{
				_id:"2",avatar:"https://www.w3schools.com/howto/img_avatar.png"
			},
		],
		totalMembers:2,
		totalMessages:20,
		creator:{
			name:"rajeev",
			avatar:"https://www.w3schools.com/howto/img_avatar.png",
		},
		
	},
	{
		name:"Aditi",
		avatar:["https://www.w3schools.com/howto/img_avatar.png"],
		_id:"2",
		groupChat:true,
		members:[
		{
			_id:"1",avatar:"https://www.w3schools.com/howto/img_avatar.png"
		},
		{
			_id:"2",avatar:"https://www.w3schools.com/howto/img_avatar.png"
		},
	],
		totalMembers:2,
		totalMessages:20,
		creator:{
			name:"rajeev",
			avatar:"https://www.w3schools.com/howto/img_avatar.png",
		},
		
	},
],
messages:[
	{
		attachments:[],
		content:"I am the best and i DESREVE ALL GOOGO THINGS",
		_id:"rajeev",
		sender:{
			avatar:"https://www.w3schools.com/howto/img_avatar.png",
			name:"Satwik",
		},
		chat:"chatID",
		groupsChat:false,
		createdAT:"2024-02-12T10:41:30.630Z",
	},
	{
		attachments:[
			{
			url:"https://www.w3schools.com/howto/img_avatar.png",
			public_id:"chatId",
		}
		],
		content:"I am the best and i DESREVE ALL GOOGO THINGS",
		_id:"Satwiek",
		sender:{
			avatar:"https://www.w3schools.com/howto/img_avatar.png",
			name:"rajev",
		},
		chat:"chateeID",
		groupsChat:true,

		createdAT:"2024-02-12T10:41:30.630Z",
	},
],
}