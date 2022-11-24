package com.example.bootstrap.controller;


import com.example.bootstrap.pojo.User;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.jws.soap.SOAPBinding;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Controller
public class TableController {
    private Map<String, User> userMap =new HashMap();

    @GetMapping({"/index.html",""})
    public String index(){
        JSONArray jsonArray=new JSONArray();
        String dataFilePath=projectPath+"/src/main/resources/data/"+"user.json";
        try {
            File file = new File(dataFilePath) ;
            String content = FileUtils.readFileToString(file,"UTF-8");
            JSONObject jsonObj = JSON.parseObject(content);
            jsonArray=jsonObj.getJSONArray("rows");
            System.out.println(jsonArray);

            for(int i=0;i<jsonArray.size();i++){
                JSONObject jsonObject= (JSONObject) jsonArray.get(i);
                String userId=(String) jsonObject.get("userId");
                String password=(String) jsonObject.get("password");
                String Tel=(String) jsonObject.get("Tel");
                User user=new User(userId,password,Tel);
                userMap.put(userId,user);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
        return "index";
    }

    private String projectPath=System.getProperty("user.dir");



    @GetMapping("/getUser")
    public void getUser(HttpServletResponse response) throws IOException {
        /**
         * 通过读取Json文件来进行数据初始化
         */
        JSONArray jsonArray=new JSONArray();

        for(Map.Entry<String,User> entry:userMap.entrySet()){
            User user=entry.getValue();
            JSONObject jsonObject=new JSONObject();
            jsonObject.put("userId",user.getUserId());
            jsonObject.put("password",user.getPassword());
            jsonObject.put("Tel",user.getTel());
            jsonArray.add(jsonObject);
        }

        response.setContentType("text/html;charset=UTF-8");
        response.getWriter().print(jsonArray.toJSONString());
    }


    @GetMapping("/addUser")
    @ResponseBody
    public Map<String,String> addUser(HttpServletRequest request){
        String userId=request.getParameter("userId");
        String password=request.getParameter("password");
        String Tel=request.getParameter("Tel");

        User user=new User(userId,password,Tel);
        userMap.put(userId,user);
        Map<String,String> map=new HashMap<>();
        map.put("msg","增加成功");

        return map;
    }

    @GetMapping("/editUser")
    @ResponseBody
    public Map<String,String> editUser(HttpServletRequest request){
        String userId=request.getParameter("userId");
        String password=request.getParameter("password");
        String Tel=request.getParameter("Tel");

        User user=new User(userId,password,Tel);
        userMap.put(userId,user);
        Map<String,String> map=new HashMap<>();
        map.put("msg","修改成功");

        return map;
    }


    @GetMapping("/deleteUser")
    @ResponseBody
    public Map<String,String> deleteUser(HttpServletRequest request){
        String userId=request.getParameter("userId");
        System.out.println(userId);
        userMap.remove(userId);
        Map<String,String> map=new HashMap<>();
        map.put("msg","删除成功");
        return map;
    }

}
