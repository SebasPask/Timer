const electron = require('electron');
const { Tray, app, Menu } = electron;

class TimerTray extends Tray{
    constructor(iconPath, mainWindow){
        super(iconPath);
        this.mainWindow = mainWindow;
        this.setToolTip('Timer 1.1.0');
        this.on('click', this.onClick.bind(this));
        this.on('right-click', this.onRightClick.bind(this));
    }
    onRightClick(){
        const menuConfig = Menu.buildFromTemplate([
            { role:'reload',accelerator:process.platform === 'darwin' ? 'Command+R' : 'Ctrl+R' },
            {label:'Quit',accelerator:process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q' ,click(){app.quit();}}
        ]);
        this.popUpContextMenu(menuConfig);
    }
    onClick(event,bounds){
        const { x,y } = bounds;
        const { height, width } = this.mainWindow.getBounds();
        if(this.mainWindow.isVisible()){
            this.mainWindow.hide();
        }else{
            const yPosition = process.platform === 'darwin' ? y : y - height;
            this.mainWindow.setBounds({
                x: x - width / 2 ,
                y:yPosition,
                height,
                width
            });
            this.mainWindow.show();
        }
    }
}
module.exports =  TimerTray;