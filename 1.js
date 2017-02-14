const compose = require('@stamp/compose');

const HasPassword = compose({
    properties: {
        password: '(no password)'
    },
    methods: {
        getPassword() {
            return this.password;
        },
        setPassword(password) {
            this.password = password;
        }
    }
});

const hasPassword = HasPassword();
console.log('this.password', hasPassword.password);
console.log('this.getPassword()', hasPassword.getPassword());

hasPassword.setPassword('42');
console.log('this.getPassword()', hasPassword.getPassword());

/* */
/*

let ServerConnection = compose(
    HasPassword,
    {
        initializers: [function () {
            this.setPassword(process.env.DB_PWD);
        }],
        methods: {
            async connect() {
                return await new Promise((resolve) => {
                    setTimeout(() => resolve(this.getPassword()), 1);
                });
            }
        }
    }
);

let serverConnection = ServerConnection();

serverConnection.connect().then(res => {
    console.log(res);
});

// serverConnection.password = 'NOOOOOOOOO';

/* */
/*

const Privatize = require('@stamp/privatize');

ServerConnection = ServerConnection.compose(Privatize);

serverConnection = ServerConnection();
console.log('this.password', serverConnection.password);
console.log('this.getPassword()', serverConnection.getPassword());

/* */
/*

ServerConnection = ServerConnection.privatizeMethods(
    'getPassword', 'setPassword'
);

serverConnection = ServerConnection();
console.log('this.password', serverConnection.password);
console.log('this.getPassword', serverConnection.getPassword);
console.log('this.setPassword', serverConnection.getPassword);

/* */
/*

serverConnection = ServerConnection();

ServerConnection().connect().then(res => {
    console.log(res);
});

serverConnection.password = 'NOOOOOOOOO';

/* */
