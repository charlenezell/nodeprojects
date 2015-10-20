<%@ page contentType="text/html;charset=utf-8" %><%@ taglib uri="/fis" prefix="fis"%><fis:extends name="page/layout/frame.jsp">

    <fis:block name="body">

        <fis:block name="header">
            <fis:widget name="widget/header/header.jsp" />
        </fis:block>

        <fis:block name="content"></fis:block>

        <fis:block name="footer">
            <fis:widget name="widget/footer/footer.vm" />
        </fis:block>

    </fis:block>
 
  <%-- auto inject by fis3-preprocess-extlang--%>
  <fis:require name="page/layout/front.jsp" />
</fis:extends>
