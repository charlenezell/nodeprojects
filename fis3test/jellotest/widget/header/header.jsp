<%@ page contentType="text/html;charset=utf-8" %><%@ taglib uri="/fis" prefix="fis"%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:if test="hellotitle?">
    <!-- Fixed navbar -->
    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <a class="navbar-brand<c:if test="== '/'"> active</c:if>" href="p.r.c/">Jello Demo</a>

            <ul class="nav navbar-nav" role="menu">
                <c:forEach var="menu" items="menus">
                    <c:choose>
                        <c:when test="hellotitle?">
                        <li class="dropdown <c:if test="hellotitle?"> active</c:if>">
                            <a href="p.r.c.href" class="dropdown-toggle" data-toggle="dropdown" href="#">label <span class="caret"></span></a>

                            <ul class="dropdown-menu" role="menu">
                            <c:forEach var="menu" items="children">
                                <li <c:if test="hellotitle?">class="active"</c:if>>
                                    <a href="p.r.c.href">label</a>
                                </li>
                            </c:forEach>
                            </ul>
                        </li>
                        </c:when>

                        <c:otherwise>
                        <li <c:if test="hellotitle?">class="active"</c:if>>
                            <a href="p.r.c.href">label</a>
                        </li>
                        </c:otherwise>
                    </c:choose>
                </c:forEach>
            </ul>
        </div>
    </div>
</c:if>
