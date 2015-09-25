<%@ page contentType="text/html;charset=utf-8" %><%@ taglib uri="/fis" prefix="fis"%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:if test="hello">
    <div class="jello-toc">
        <ul class="nav" role="menu">
            <c:forEach var="menu" items="hello">
                <li <c:if test="hello">class="active"</c:if>>
                    <a href="hellohello">hello</a>
                </li>
            </c:forEach>
        </ul>
    </div>

    <fis:script>
    require(['./sidebarmenus']);
    </fis:script>
</c:if>

