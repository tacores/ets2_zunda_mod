
/*
TODO　下記の機能を実装する
１．Asset、Eventの削除（クリーンな状態に戻す）
２．Assetの追加＆Eventの作成（Multiple音声に対応する）
３．音量レベル変更
４．Eventを game/navigation 配下に移動
５．build、GUIDエクスポートの実行

※２以外は手動操作でも構わない
*/

folder = "F:\\Mods\\ETS2\\TomTom_voices\\automatic_generator\\navigation_tomtom_1.37\\sound\\navigation";
build = "F:\\Mods\\ETS2\\TomTom_voices\\fmod\\template\\build";

datas = ['data00', 'data01', 'data02', 'data04', 'data05', 'data06', 'data07', 'data08', 'data09', 'data10', 'data11', 'data12', 'data13', 'data14', 'data15', 'data16', 'data161', 'data162', 'data163', 'data164', 
'data165', 'data166', 'data167', 'data168', 'data169', 'data17', 'data170', 'data171', 'data172', 'data173', 'data18', 'data19', 'data20', 'data21', 'data22', 'data23', 'data24', 'data25', 'data26', 'data27', 'data28', 'data29', 'data30', 'data31', 'data32', 'data33', 'data34', 'data35', 'data36', 'data37', 'data38', 'data39', 'data40', 'data41', 'data42', 'data43', 'data44', 'data45', 'data46', 'data47', 'data49', 'data50', 'data51', 'data52', 'data53', 'data54', 'data55', 'data56', 'data57']

files = ['and_then_exit_left.ogg', 'and_then_exit_right.ogg', 'and_then_go_straight.ogg', 'and_then_keep_left.ogg', 'and_then_keep_right.ogg', 'and_then_turn_left.ogg', 'and_then_turn_right.ogg', 'compound_exit_left.ogg', 'compound_exit_right.ogg', 'compound_go_straight.ogg', 'compound_keep_left.ogg', 'compound_keep_right.ogg', 'compound_turn_left.ogg', 'compound_turn_right.ogg', 'exit_left.ogg', 'exit_now.ogg', 'exit_right.ogg', 'finish.ogg', 'go_straight.ogg', 'keep_left.ogg', 'keep_right.ogg', 'prepare_exit_left.ogg', 'prepare_exit_right.ogg', 'prepare_turn_left.ogg', 'prepare_turn_right.ogg', 'recomputing.ogg', 
'roundabout_1.ogg', 'roundabout_2.ogg', 'roundabout_3.ogg', 'roundabout_4.ogg', 'roundabout_5.ogg', 'roundabout_6.ogg', 'speed_signal.ogg', 'speed_warning.ogg', 'start.ogg', 'turn_left.ogg', 'turn_right.ogg', 'u_turn.ogg'];


bus = studio.project.lookup("bus:/game/navigation");

for (var i = 0; i < datas.length; i++) {
    data = datas[i];
    bank = studio.project.create("Bank");
    bank.name = data;

    bf = studio.system.getFile(build + "\\" + data + ".bguid");
    bf.open(studio.system.openMode.Append);
    bf.writeText(bank.id + " bank:/" + data + "\r\n");
    bf.close();

    f = studio.system.getFile(build + "\\" + data + ".guid");
    f.open(studio.system.openMode.Append);

    console.log("Creating bank " + data);

    for (var j = 0; j < files.length; j++) {
        file = files[j];
        af = studio.project.importAudioFile(folder + "\\" + data + "\\" + file);
        af.setAssetPath(data + "/" + file);

        e = studio.project.create("Event");
        e.name = file.replace(".ogg", "");

        e.relationships.banks.add(bank);

        t = e.addGroupTrack();
        s = t.addSound(e.timeline, "SingleSound", 0, 10);

        s.audioFile = af;
        s.length = af.length;

        bus.relationships.input.add(e.mixerInput);

        f.writeText(e.id + " event:/" + e.name + "\r\n");

        console.log("Importing file " + file);
    }
    f.close();
}

studio.project.build();
