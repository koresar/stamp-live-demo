const compose = require('@stamp/compose');

const EmptyStamp = compose(); // creating an empty stamp
let obj = EmptyStamp(); // it can create empty objects!
console.log(obj); // {}

/* */
/*

const HasFoo = compose({
    properties: {
        foo: 'default foo!'
    }
});
obj = HasFoo();
console.log(obj); // { foo: 'default foo!' }

/* */
/*

const PrintFoo = compose({
    methods: {
        printFoo() {
            console.log(this.foo || 'There is no foo');
        }
    }
});
obj = PrintFoo();
obj.printFoo(); // There is no foo

/* */
/*

let Foo = compose(HasFoo, PrintFoo);
obj = Foo();
obj.printFoo(); // default foo!

/* */
// /*

Foo = HasFoo.compose(PrintFoo);
// or
Foo = PrintFoo.compose(HasFoo);
// or
Foo = compose().compose(HasFoo).compose(PrintFoo);
// or
Foo = compose(HasFoo).compose(PrintFoo);
// or
// ...well you get it :)

/* */
/*

const InitFoo = compose({
    initializers: [function (foo) {
        if (foo) this.foo = foo;
    }]
});
obj = InitFoo('incoming foo!');
console.log(obj); // { foo: 'incoming foo!' }

/* */
/*

Foo = compose(HasFoo, PrintFoo, InitFoo);
obj = Foo('incoming foo 2!');
obj.printFoo(); // incoming foo 2!

/* */
