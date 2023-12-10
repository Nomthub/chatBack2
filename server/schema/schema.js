const graphql = require('graphql');
const {GraphQLObjectType , 
        GraphQLID , 
        GraphQLString,
        GraphQLList,
        GraphQLSchema,
        GraphQLNonNull
    } = graphql;
const _= require('lodash');

//hardcoded data
var Tutorials = [
    {id:'1',title: 'Soft skill 1',description:'How to find your WHY' , Tid:'1'},
    {id:'2',title: 'Business1',description:'How to setup your business model' , Tid:'2'},
    {id:'3',title: 'Business1',description:'How business models grow' , Tid:'2'},
    {id:'4',title: 'Soft Skill',description:'Selling ideas' , Tid:'1'},
    {id:'5',title: 'Builders',description:'How to analyse problems' , Tid:'3'},
    {id:'6',title: 'Builders',description:'Making and drawing out solutions' , Tid:'3'}
];

var Tutors = [
    {id: '1' , name: 'Brandon Schuster' , occupation : 'Life Choach'},
    {id: '2' , name: 'Priyag Shaik' , occupation : 'Business Analyst'},
    {id: '3' , name: 'Hanni Prince' , occupation : 'Computer Scientist'}
];

const TutorialType = new GraphQLObjectType({
    name : 'Tutorial',
    fields:() => ({
        id : {type : GraphQLID},
        title: {type: GraphQLString},
        description:{type: GraphQLString},
        tutor:{
            type: TutorType,
            resolve(parent, args){
                //get data from database
                //return Tutors.findById(parent.Tid);
                //console.log(parent);
                return _.find(Tutors,{id:parent.Tid});
            }
        }
    })
});

const TutorType = new GraphQLObjectType({
    name: 'Tutor',
    fields:() => ({
        id:{type: GraphQLID},
        name:{type: GraphQLString},
        occupation: {type: GraphQLString},
        Tutorials:{
            type: new GraphQLList(TutorialType),
            resolve(parent, args){
                //get data from database
                //return Tutorials.findById({Tid: parent.id});
                return _.filter(Tutorials,{Tid: parent.id});
             }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        Tutorial:{
            type: TutorialType,
            args:{
                id:{type: GraphQLID}
            },
            resolve(parent, args){
                //code to get data from database
                //return Tutorial.findById(args.id);
                return _.find(Tutorials, {id:args.id});
            }
        },
         Tutor:{
            type: TutorType,
            args:{
                id:{type: GraphQLID}
            },
            resolve(parent, args){
                //code to get data from database
                //return Tutor.findById(args.id);
                return _.find(Tutors, {id:args.id});
            }
        },
        Tutorials:{
            type: new GraphQLList(TutorialType),
            resolve(parent, args){
                //code to get data from database
                //return Tutorials.find({})
                return Tutorials
            }
        },
        Tutors:{
            type: new GraphQLList(TutorType),
            resolve(parent, args){
                //code to get data from database
                //return Tutors.find({})
                return Tutors
            }
        }
    }
});

const mutations = new GraphQLObjectType({
    name : 'mutation',
    fields : ({
        addTutor : {
            type : TutorType,
            args : {
                id : {type : new GraphQLNonNull(GraphQLID)},
                name : {type : new GraphQLNonNull(GraphQLString)},
                occupation : {type : new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent , args){
                let Tutor = new Tutors({
                    id : args.id,
                    name : args.name,
                    occupation : args.occupation
                });
                return Tutors.push(Tutor);
                //for database
                //return Tutor.save();
            }
        },

        addTutorial : {
            type : TutorialType,
            args : {
                id : {type :new GraphQLNonNull(GraphQLID)},
                title: {type: new GraphQLNonNull(GraphQLString)},
                description:{type:new GraphQLNonNull( GraphQLString)},
                Tid : {type : new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent , args){
                let Tutorial = new Tutorials({
                    id : args.id,
                    title : args.title,
                    description : args.description,
                    Tid : args.Tid
                });
                return Tutorials.push(Tutorial);
                //for database
                //return Tutorial.save();
            }
        }
    })
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    //mutation: mutations
});