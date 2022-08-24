クラウド変数をいじれるライブラリです。名前はまだ決めていませんし超作成中です。クラウド変数を記録するなり変更するなりの最低限の機能しか備わっていません。
最適化が全然できていません、自分でもちゃんと使い方が理解できていないレベルです。
まず、このライブラリを使うにはnode.js v18.6?以降がインストールされている必要があります。ちなみに理由はfetchを使うからです。主は頭がおかしいのでnpmにあるfetchのライブラリを使う気になりませんでした。新しいベータ版の機能を必須にするとかバカですね。ブラウザのコンソールでは使用できません。
とりあえずJavascriptの知識0で使えるようなものでは到底ないですね。


基本的にはindex.jsを書き換えて使う。
クラウド変数は ☁ uho というように最初に☁ があるがこのライブラリでこれを書く必要はない。それとクラウド変数の名前は今のところ大/小文字で書かれた物しか対応していません。
scratchの言語は英語に設定しないともしかしたらエラーを吐くかもしれない。そこはこれから対応する。
メソッド一覧

await cloud.signin("accountname","password");
サインインする。もしユーザー名がfrezerでパスワードがgorillaならこのようになる。
await cloud.signin("frezer","gorilla");


const socket = await cloud.connecttoserver();
サーバーに接続する。index.jsにもとから書いてあるからそれをそのまま使っていい。


socket.onopen= function(){
    cloud.handshake("projectid");
}
データベースに接続したら、プロジェクトのクラウド変数にアクセスする。Socket.onopenがデータベースに接続したらを意味し、cloud.handshake("projectid")でクラウド変数にアクセスする。
もし接続したいプロジェクト番号のidが114514なら、このようになる。
cloud.handshake("114514");


socket.onmessage = function(event){
    //ここにコードが入る。
}
プロジェクトのクラウド変数の値が誰かによって変更されたときに発火する関数。


cloud.sort()
受け取ったクラウド変数の情報を整理して返す。恐らくこのような使い方が最も多いだろう。

socket.onmessage = function(event){
    const clouddata = cloud.sort(event.data);
    console.log(clouddata.datas);//クラウド変数の値全てがクラスとして返される。
    console.log(clouddata.datas.value);//プロジェクトのvalueという名前の変数の値が返される。これの場合、もしプロジェクトにvalueというクラウド変数がなかったら動かない。susというクラウド変数の値が欲しいならclouddata.datas.susになるしbakaというクラウド変数の値が欲しいならclouddata.datas.bakaになる。
    console.log(clouddata.change);//変更された変数の名前一覧を配列として返す。
}

cloud.sendtocloud("name","value");
クラウド変数の値を変更する。ちゃんと接続できてからしか動かないから適当に使うとエラーを吐く。socket.onmessageの中で使うのがよさそう
もしyjuというクラウド変数の値を1919に変えたいならこのようになる。
cloud.sendtocloud("yju","1919");
