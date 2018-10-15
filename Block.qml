import QtQuick 2.9
import 'tic.js' as Tic


Rectangle{
    id: container
    property int blockId
    border.width: 3
    border.color: "#000000"
    property var onkoVapaa: true
    color: "white"


    MouseArea{
        id: hiiriAlue
        enabled: true
        anchors.fill: parent
        onClicked: {
                Tic.pelaajaVuoro()
                onkoVapaa = false



        }
    }

    Item {
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.verticalCenter: parent.verticalCenter


        Text{
            id: blockTxt
            text: ''
            font.pointSize: 20
            anchors.horizontalCenter: parent.horizontalCenter
            anchors.verticalCenter: parent.verticalCenter
        }
    }
}
