{% extends 'testapp:page/layout.tpl' %}

{% block content %}
     <div id="pages-container">
        {% widget "testapp:widget/message/message.tpl"%}
     </div>
{% endblock %}