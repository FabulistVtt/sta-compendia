Hooks.once('init', function() {
    console.log('Star Trek Adventures Compendia initializing...');
    game.settings.register(
        'sta-compendia',
        'showLegalStartupPopup',
        {
            name: "Show Legal Popup at Startup",
            hint: "Displays a message with copyright and license information.",
            scope: "client",
            config: true,
            requiresReload: false,
            type: Boolean,
            default: true
        });
    console.log('Star Trek Adventures Compendia initialized.');
});


Hooks.once('ready', function() {
    if(game.settings.get('sta-compendia', 'showLegalStartupPopup')) {
        fetch('modules/sta-compendia/module/credits.html')
        .then((response) => response.text())
        .then((message) =>
            {
                console.log('"credits.html" read successfully');
                let dialog = new Dialog(
                    {
                        title: "Star Trek Adventures Compendia Legal Information",
                        content: message,
                        buttons: {
                            tutorial: {
                                label: "Show Me Some Tutorials",
                                callback: () => {
                                    game.packs.get('sta-compendia.manual-tutorials-core').getDocument('w6U4HlhU66tSmYhP')
                                        .then((document) => document.sheet.render(true));
                                }
                            },
                            ok: {
                                label: "OK",
                                callback: () => dialog.close()
                            },
                            dismiss: {
                                label: "OK & Don't Show Again for This World",
                                callback: () => {
                                    game.settings.set('sta-compendia', 'showLegalStartupPopup',false);
                                    dialog.close();
                                }
                            }
                        }
                    }
                );
                dialog.position.width = window.innerWidth * 0.75;
                console.log('Message window dimensions: ' + dialog.position.width + ", " + dialog.position.height);
                console.log('Canvas dimensions: ' + canvas.dimensions.width + ", " + canvas.dimensions.height);
                dialog.render(true);
            }
        )
        .catch((error) =>
            {
                console.log('"credits.html": ' + error);
            }
        );
    }
});