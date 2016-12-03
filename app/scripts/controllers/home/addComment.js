// Generated by CoffeeScript 1.7.1
Mifan.controller("addCommentCtrl", function($scope, $http) {
  var comment;
  comment = {
    init: function() {
      $scope.comment = comment.send;
      $scope.$on("commentCb", function(e, data) {
        return comment.sendCb(data);
      });
      $scope.$on("getcommentCb", function(e, data) {
        return comment.getCb(data);
      });
      $scope.expandCmtFn = comment.expand;
      $scope.expandReplyFn = comment.replyExpand;
      return $scope.reply = comment.reply;
    },
    point: null,
    feed: null,
    getcommentFeed: null,
    content: "",
    send: function(news, point, isReply) {
      var content;
      point.isSendingCmt = true;
      content = isReply ? "回复@" + comment.replyUsername + ": " + point.rplContent : point.cmtContent;
      comment.content = content;
      $scope.$emit("comment", {
        askid: news.ask.askid,
        answerid: news.answer.answerid,
        content: content
      });
      comment.point = point;
      return comment.feed = news;
    },
    sendCb: function(data) {
      var cmt, msg, result, ret, toastType, user, _ref, _ref1, _ref2;
      ret = data.ret, msg = data.msg, result = data.result;
      toastType = "";
      if (String(ret) !== "100000") {
        toastType = "warn";
      }
      $scope.toast(msg);
      if (comment.point) {
        comment.point.isSendingCmt = false;
        comment.point.isSendingRpl = false;
        comment.point.cmtContent = "";
        comment.point.rplContent = "";
        comment.point.expandReply = false;
      }
      user = $scope.user;
      cmt = {
        content: comment.content,
        addtime: +(new Date),
        user: {
          "userid": user.userid,
          "username": user.username,
          "email": user.email,
          "face": user.email,
          "path": user.path,
          "face_120": user.face_120,
          "face_60": user.face_60
        }
      };
      if ((_ref = comment.feed) != null) {
        _ref.commentList.splice(0, 0, cmt);
      }
      return (_ref1 = comment.feed) != null ? _ref1.answer.comment_count = ((_ref2 = comment.feed) != null ? _ref2.answer.comment_count : void 0) - 0 + 1 : void 0;
    },
    expand: function(feed, point) {
      point.expandCmt = !point.expandCmt;
      if (point.expandCmt) {
        comment.get(feed, point);
        return comment.getcommentFeed = feed;
      }
    },
    get: function(feed, point) {
      var data;
      data = {
        answerid: feed.answer.answerid
      };
      return $scope.$emit("getcomment", data);
    },
    getCb: function(data) {
      var msg, result, ret, _ref;
      ret = data.ret, msg = data.msg, result = data.result;
      return (_ref = comment.getcommentFeed) != null ? _ref.commentList = result || [] : void 0;
    },
    replyExpand: function(feed, point) {
      return point.expandReply = !point.expandReply;
    },
    replyUsername: "",
    reply: function(index, feed, point) {
      var cmt, username;
      cmt = feed.commentList[index];
      username = cmt.user.username;
      comment.replyUsername = username;
      point.isSendingRpl = true;
      return comment.send(feed, point, true);
    },
    replyCb: function(data) {}
  };
  return comment.init();
});
