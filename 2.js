const compose = require('@stamp/compose');

const Privatize = require('@stamp/privatize');

const HasPassword = compose(
    {
        methods: {
            getPassword() {
                return this.password;
            },
            setPassword(password) {
                this.password = password;
            }
        },
        properties: {
            password: '(no password)'
        }
    },
    Privatize.privatizeMethods('getPassword', 'setPassword')
);

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

/* */
/*

const ServerConnectionOverwrite = ServerConnection.compose({
    methods: {
        getPassword() { return 'OVERWRITE'; },
        setPassword() { } // :(
    }
});

let serverConnection = ServerConnectionOverwrite();

serverConnection.connect().then(res => {
    console.log(res);
});

/* */
/*

const Collision = require('@stamp/collision');

ServerConnection = ServerConnection.compose(Collision)
    .collisionSetup({forbid: ['getPassword', 'setPassword']});

try {
    ServerConnection.compose({
        methods: {
            getPassword() { return 'OVERWRITE'; },
            setPassword() { } // :(
        }
    });
} catch (ex) {
    console.error('ERROR:', ex.message);
}

/* */
/*

serverConnection = ServerConnection();

serverConnection.connect().then(res => {
    console.log(res);
});

/* */
