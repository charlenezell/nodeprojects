<%@ page contentType="text/html;charset=utf-8" %><%@ taglib uri="/fis" prefix="fis"%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:if test="hello">
    <!-- Fixed navbar -->
    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <a class="navbar-brand<c:if test="hello"> active</c:if>" href="hello/">Jello Demo</a>

            <ul class="nav navbar-nav" role="menu">
                <c:forEach var="menu" items="hello">
                    <c:choose>
                        <c:when test="hello">
                        <li class="dropdown <c:if test="hello"> active</c:if>">
                            <a href="hellohello" class="dropdown-toggle" data-toggle="dropdown" href="#">hello <span class="caret"></span></a>

                            <ul class="dropdown-menu" role="menu">
                            <c:forEach var="menu" items="hello">
                                <li <c:if test="hello">class="active"</c:if>>
                                    <a href="hellohello">hello</a>
                                </li>
                            </c:forEach>
                            </ul>
                        </li>
                        </c:when>

                        <c:otherwise>
                        <li <c:if test="hello">class="active"</c:if>>
                            <a href="hellohello">hello</a>
                        </li>
                        </c:otherwise>
                    </c:choose>
                </c:forEach>
            </ul>
        </div>
    </div>
</c:if>
