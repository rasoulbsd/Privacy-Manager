const electron = require ('electron')  // imports electron
const path = require ('path') // imports path module
const {app, Menu, Tray} = electron // imports menu and tray modules
const cmd=require('node-cmd');
const fs = require('fs');
const util = require('util');


const readFile = util.promisify(fs.readFile);
const command = util.promisify(cmd.run);


const path2 = 'C:\\Users\\Public\\Documents\\Privacy_Manager\\Status.txt';

function read_from_file(){
    console.log("Inside read_from_file");
    return  fs.readFileSync('C:\\Users\\Public\\Documents\\Privacy_Manager\\Status.txt', 'utf-8');
}

let status = 5;
console.log("Status Default: ", status,"\n");

async function create_menu(){
    console.log("status: ",status);
    status = read_from_file();
    console.log("status: ", status);
    create_tray(status);
}

function create_tray(status_flag){
    if(status_flag == "Allow"){
        console.log("inside create_tray - status: " + status_flag);
        var tray
        app.on('ready', _ => {
            tray = new Tray (path.join ('.', '/docs/logo/logo.ico' ) ) // sets tray icon image
            const contextMenu = Menu.buildFromTemplate([   // define menu items
                {
                    label: 'Mic',
                    type : "checkbox",
                    checked:"true",

                    click:  ()  => {
                        cmd.run('cscript.exe //NoLogo ./vbs/microphone/mic_off.vbs');
                        status_flag = "Deny";
                        console.log("Now:");
                        console.log(status_flag);
                    },
                },
                {
                    type : "separator",
                },
                {
                    label: 'Exit',
                    type : "normal",
                    click: () => app.quit(),
                    },
            ])
            tray.setContextMenu(contextMenu)
        })
    }
    else{
        console.log("Inside create_tray - status: ", status_flag);

        var tray
        app.on('ready', _ => {
            tray = new Tray (path.join ('.', '/docs/logo/logo.ico' ) ) // sets tray icon image
            const contextMenu = Menu.buildFromTemplate([   // define menu items
                {
                    label: 'Mic',
                    type : "checkbox",

                    click:  ()  => {
                        cmd.run('cscript.exe //NoLogo ./vbs/microphone/mic_on.vbs');
                        status_flag = "Allow";
                        console.log("Now:");
                        console.log(status_flag);
                    },
                },
                {
                    type : "separator",
                },
                {
                    label: 'Exit',
                    type : "normal",
                    click: () => app.quit(),
                    },
            ])
            tray.setContextMenu(contextMenu)
        })
    }

}

create_menu();
