package com.niit.entity;

public class Comment {
    private int cId;
    private String cUName;
    private String cContent;
    private String cDate;
    private String cUHeadImg;
    private int cReplyId;
    private int mid;

    public int getcId() {
        return cId;
    }

    public void setcId(int cId) {
        this.cId = cId;
    }

    public String getcUName() {
        return cUName;
    }

    public void setcUName(String cUName) {
        this.cUName = cUName;
    }

    public String getcContent() {
        return cContent;
    }

    public void setcContent(String cContent) {
        this.cContent = cContent;
    }

    public String getcDate() {
        return cDate;
    }

    public void setcDate(String cDate) {
        this.cDate = cDate;
    }

    public String getcUHeadImg() {
        return cUHeadImg;
    }

    public void setcUHeadImg(String cUHeadImg) {
        this.cUHeadImg = cUHeadImg;
    }

    public int getcReplyId() {
        return cReplyId;
    }

    public void setcReplyId(int cReplyId) {
        this.cReplyId = cReplyId;
    }

    public int getMid() {
        return mid;
    }

    public void setMid(int mid) {
        this.mid = mid;
    }
}
