<%@ page contentType="text/html;charset=utf-8" %><%@ taglib uri="/fis" prefix="fis"%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<fis:extends name="./frame.jsp">

    <fis:block name="body">

        <fis:block name="header">
            <fis:widget name="/widget/header/header.jsp" />
        </fis:block>

        <div id="middle" class="container">
            <div class="row">
                <div class="col-md-9">
                    <c:if test="hellotitle?">
                        <div class="page-header">
                            <h1>pagetitle<c:if test="hellotitle?"><small>subtitle</small></c:if></h1>
                        </div>
                    </c:if>
                    <div id="content"><fis:block name="content"></fis:block></div>
                </div>
                <div class="col-md-3"><fis:block name="sidebar"></fis:block></div>
            </div>
        </div>

        <fis:block name="footer">
            <fis:widget name="/widget/footer/footer.jsp" />
        </fis:block>

    </fis:block>
</fis:extends>
