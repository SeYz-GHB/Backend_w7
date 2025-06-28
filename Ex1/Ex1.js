/*
1 
User.hasOne(Profile);
await sequelize.sync();

const profile = await Profile.create({ bio: 'Test' });
const user = await profile.createUser({ username: 'joe' });
 */
User.hasOne(Profile);
Profile.belongsTo(User); 

await sequelize.sync();

const user = await User.create({ username: 'joe' });
const profile = await user.createProfile({ bio: 'Test' });

/*
2 
Book.hasMany(Author);

await sequelize.sync();
const author = await Author.create({ name: 'Samnang' });
const book = await author.createBook({ title: 'Wrong Way' });
 */
Book.hasMany(Author);
Author.belongsTo(Book); 

await sequelize.sync();
const book = await Book.create({ title: 'Wrong Way' });
const author = await book.createAuthor({ name: 'Samnang' }); 

/*
3
User.hasOne(Profile);
Profile.belongsTo(User);

const user = await User.create({ username: 'Jon' });
const profile = await Profile.create({ bio: 'hello' });

await user.addProfile(profile);
 */
User.hasOne(Profile);
Profile.belongsTo(User);

const user = await User.create({ username: 'Jon' });
const profile = await Profile.create({ bio: 'hello' });

await user.setProfile(profile);


/*
4
Employee.hasOne(Manager);
Manager.hasOne(Employee);
 */
Manager.hasMany(Employee);
Employee.belongsTo(Manager);