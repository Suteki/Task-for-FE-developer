# Task-for-FE-developer

## Summary
- Used React, Redux, react-router.
- Wrote 11 tests for action, form, reducer, store.
- For testing used Lint, Mocha, thunk and wrote mockApi.

### Before start:
```sh
install node.js
download project
then run 'npm install'
```

### Main commands:
You can change fake ajax time response in /src/api/delay. But note that if you change response time to more than 2000 Async test will fail.
```sh
npm start - create dev build
npm run test - runs tests
npm run build - create prod build
```

### Knowing issues:
> slider may load pics a bit slow

#### Comments
Used boilerplate environment. Also used bootstrap to make dumb components more responsive in easy way. Pure css slider was changed by react component. So it didn't used and was moved to slider-task directory.  

#### Improvements
- We could write more tests to make 100% code cover 
- Completely move all html tags to dumb components and make more abstractions
