import Vue from 'vue'
import Router from 'vue-router'

/**
 * @define Components
 * -----------------------------------------------
 */
import LoginComponent from "@views/login";
import HomeComponent from '@views/home';
import WelcomeComponent from '@views/welcome';
import WeeklyComponent from '@views/weekly/weekly';
import TaskListComponent from '@views/task/task-list';
import TaskDetaisComponent from '@views/task/task-details';
import EditorComponent from '@views/project/editor';
import LaunchWorkComponent from '@views/launch/launch-list';
import LaunchDetailComponent from '@views/launch/launch-detail';
import SendMessageComponent from '@views/sms/send-message';
import modeEditorComponent from '@views/sms/modeEditor';
import tagEditorComponent from '@views/label/tagEditor';
import sendRecordComponent from '@views/sms/sendRecord';
import visitListComponent from '@views/visit/visitList';
import followUpComponent from '@views/visit/followUp';
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/home/launchWork'
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginComponent
        },
        {
            path: '/home',
            name: 'Home',
            redirect: '/home/launchWork',
            component: HomeComponent,
            children: [{
                    path: 'welcome',
                    name: 'Welcome',
                    component: WelcomeComponent
                },
                {
                    path: 'weekly',
                    name: 'Weekly',
                    component: WeeklyComponent
                },
                {
                    path: 'editor',
                    name: 'editor',
                    component: EditorComponent
                },
                {
                    path: 'tasklist/:id',
                    name: 'TaksList',
                    component: TaskListComponent
                },
                {
                    path: 'visit/:id',
                    name: 'visit',
                    component: visitListComponent
                },
                 {
                     path: 'followup/:id',
                     name: 'followup',
                     component: followUpComponent
                },               
                {
                    path: 'taskdetais/:id',
                    name: 'TaskDetais',
                    component: TaskDetaisComponent
                },
                {
                    path: 'launchWork',
                    name: 'LaunchWork',
                    component: LaunchWorkComponent,
                },
                {
                    path: 'launchDetail/:id',
                    name: 'LaunchDetail',
                    component: LaunchDetailComponent,
                },
                {
                    path: 'sendMessage/:id',
                    name: 'sendMessage',
                    component: SendMessageComponent,
                },
                {
                    path: 'sendRecord',
                    name: 'sendRecord',
                    component: sendRecordComponent, 
                },
                {
                    path: 'modeEditor',
                    name: 'modeEditor',
                    component: modeEditorComponent,
                },
                {
                    path: 'tagEditor',
                    name: 'tagEditor',
                    component: tagEditorComponent,
                },
            ]
        }
    ]
})