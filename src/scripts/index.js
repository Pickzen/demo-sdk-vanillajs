import '../styles/index.scss';

const quizCode = 'HPTkH7GAWjx';
const server = 'https://admin.pickzen.com';

const Engine = window.pickzen.Engine.default;

// Initializes the SDK
Engine.load(quizCode, server, {memo:false}).then(() => {
    // Run the demo
    demo();
}).catch((error) => {
    console.error(error);
});

// Helper function to display common slide information
const displaySlide = (slide) => {
    let type = slide.getType();

    console.log("\nSlide Id: ", slide.getId());
    console.log("\tType: ", slide.getType());
    console.log("\tTitle: ", slide.getTitle());
    console.log("\tSubtitle: ", slide.getSubtitle());
    console.log("\tContent title: ", slide.getContentTitle());

    if (type=='Cover') {
        console.log("\tStart button label: ", slide.getStartLabel());
    } else if (type=='Filter' || type=='Info') {
        if (slide.isMultiple()) console.log("It is multi-select");

        let options = slide.getOptions();

        console.log("\tOptions:");
        options.forEach( option => {
            console.log('\t\t' + option.getTitle());
        });
    } else if (type=='Form') {
        let fields = slide.getFields();

        console.log("\tFields:");
        fields.forEach( field => {
            console.log('\t\t' + field.getTitle());
        });
    }
};

// Demo that will simulate a user taking the quiz
const demo = () => {
    // Slide 1 - Cover slide
    let slide = Engine.getSlide();

    displaySlide(slide);

    // Click the start button
    slide.start();

    // Slide 2 - Filter slide
    slide = Engine.getSlide();

    displaySlide(slide);

    // Get the available options
    let options = slide.getOptions();

    // Select the first option: Flat
    // This will pass to the next slide because it is a single selection slide
    slide.selectOption(options[0]);

    // Slide 3 - Info slide
    slide = Engine.getSlide();
    displaySlide(slide);

    // Get the available options
    options = slide.getOptions();

    // Select the second option: Beach
    // This will pass to the next slide because it is a single selection slide
    slide.selectOption(options[1]);

    // Slide 4 - Info slide - Multiselect
    slide = Engine.getSlide();
    displaySlide(slide);

    // Get the available options
    options = slide.getOptions();

    // Select the first option
    slide.selectOption(options[0]); // Walking

    // Select the last option
    slide.selectOption(options[3]); // Swimming

    // In this case we have to click on the Next button because it is a multi-select slide
    slide.next();

    // Slide 5 - Form slide
    slide = Engine.getSlide();
    displaySlide(slide);

    // Get the form fields
    let fields = slide.getFields();

    // Enter first field: e-mail
    fields[0].setValue('test@pickzen.com');

    // Enter second field: name
    fields[1].setValue('Anna Smith');

    slide.next();

    // Slide 6 - End slide
    slide = Engine.getSlide();
    displaySlide(slide);

    // Fectch and display the results
    slide.getResults().then( results => {
        results.forEach( result => {
            console.log("Result: ", result.getTitle());
        });
    }).catch( (reason) => {
        console.error(reason);
    })
};
