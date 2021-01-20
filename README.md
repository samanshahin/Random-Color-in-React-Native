# Random-Color-in-React-Native
 Randomly colored components in React Native
 Just run npm start to see the rendered app...
 at line 87, we defined the array of our colors then we randomly select one of them:
 const color = rndColorsItems[Math.floor((Math.random() * 6) + 1)]
 and put this color variable in database with other values for each item:
 dispatch(itemAdded({ date, title, desc, color }))
 so when it's going to be rendered in return part we use it for background color.
 then check line 46 of App.js to see it in component section:
 <View style={styles.titlebox, { backgroundColor: item.color }}>
