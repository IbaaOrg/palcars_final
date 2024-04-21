<?php 
namespace App\Http\Traits;
trait ResponseTrait {
    public function success($data){
        $res['status']=true;
        $res['msg']="";
        $res['data']=$data;
    //    $count=$data->count();
    //    $res['count']=$count;
        return response()->json($res,status: 200);
    }
    public function fail($msg,$code){
        $res['status']=true;
        $res['msg']=$msg;
        $res['data']=null;
        return response()->json($res,$code);
    }
}
?>