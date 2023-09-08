// bcs-pioneer-main-site-db
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://bcs-pioneer-main-site-db:bcs-pioneer-main-site-db@cluster0.aemhrq9.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const PDFCollection = client.db("test").collection("PDF");
const PDFRutinCollection = client.db("test").collection("PDFRutin");
const VideoRutinCollection = client.db("test").collection("VideoRutin");
const VideoCollection = client.db("test").collection("VideoStudy");
const QuestionCollection = client.db("test").collection("Question");
const ReadTopicallySubjectCollection = client.db("test").collection("ReadTopicallySubject");
const ReadTopicallyTopicCollection = client.db("test").collection("ReadTopicallyTopic");
const ReadTopicallySubTopicCollection = client.db("test").collection("ReadTopicallySubTopic");
const JobsSubjectCollection = client.db("test").collection("JobsSubject");
const JobsTopicCollection = client.db("test").collection("JobsTopic");
const JobsSubCollection = client.db("test").collection("JobsSub");
const BSCCategoryCollection = client.db("test").collection("bcs_category");
const PastJobsategoryCollection = client.db("test").collection("PastJobsategory");
const FreeWeaklyRutinCollection = client.db("test").collection("FreeWeaklyRutin");
const FreeWeaklyExamCollection = client.db("test").collection("FreeWeaklyQuestion");
const FreeWeaklyResultCollection = client.db("test").collection("FreeWeaklyResult");
const BCSForNewRoutineCollection = client.db("test").collection("BcsForNewRutin");
const BcsForNewExamCollection = client.db("test").collection("BcsForNewQuestion");
const JobSolutionRoutineCollection = client.db("test").collection("jobSolutionRoutine");
const gradePreparationRoutineCollection = client.db("test").collection("GradePreparation");
const subjectWiseRoutineCollection = client.db("test").collection("SubjectWise");
const BankRoutineCollection = client.db("test").collection("BankPreparation");
const ExperienceBcsCollection = client.db("test").collection("ExperienceBcs");
const TeacherPreparationCollection = client.db("test").collection("teacherPreparation");
const UserCollection = client.db("test").collection("users");
const FavoriteCollection = client.db("test").collection("Favorite");
const BcsForNewResultCollection = client.db("test").collection("BcsForNewResult");
const JobSolutionExamCollection = client.db("test").collection("jobSolutionExam");
const JobSolutionResultCollection = client.db("test").collection("JobSolutionResult");
const gradePreparationExamCollection = client.db("test").collection("GradePreparationExam");
const gradePreparationResultCollection = client.db("test").collection("gradePreparationResult");
const subjectWiseExamCollection = client.db("test").collection("SubjectWiseExam");
const subjectWiseResultCollection = client.db("test").collection("SubjectWiseResult");
const BankExamCollection = client.db("test").collection("BankPreparationExam");
const BankResultCollection = client.db("test").collection("BankPreparationResult");
const ExperienceBcsExamCollection = client.db("test").collection("ExperienceBcsExam");
const ExperienceBcsResultCollection = client.db("test").collection("ExperienceBcsResult");
const TeacherPreparationExamCollection = client.db("test").collection("teacherPreparationExam");
const TeacherPreparationResultCollection = client.db("test").collection("teacherPreparationResult");



async function run() {


  try {

    // study video section 
    app.post('/add-video-rutine', async (req, res) => {
      const data = req.body;
      const result = await VideoRutinCollection.insertOne(data);
      res.send(result);
    });

    app.get('/get-video-rutin', async (req, res) => {
      const query = {};
      const result = await VideoRutinCollection.find(query).toArray();
      res.send(result);
    });


    app.post('/add-study-video', async (req, res) => {
      const data = req.body;
      const result = await VideoCollection.insertOne(data);
      res.send(result)
    });

    app.get('/get-study-video', async (req, res) => {
      const section = req.query.section;
      const query = { section: section }
      if (section === 'all') {
        const result = await VideoCollection.find({}).toArray();
        res.send(result)
      } else {
        const result = await VideoCollection.find(query).toArray();
        res.send(result);
      };
    });

    app.delete('/delete-video', async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await VideoCollection.deleteOne(query);
      res.send(result);
    })
    // study PDF section 
    app.post('/add-pdf-rutine', async (req, res) => {
      const data = req.body;
      const result = await PDFRutinCollection.insertOne(data);
      res.send(result);
    });
    app.get('/get-pdf-rutine', async (req, res) => {
      const query = {};
      const result = await PDFRutinCollection.find(query).toArray();
      res.send(result);
    });

    app.post('/add-study-pdf', async (req, res) => {
      const data = req.body;
      const result = await PDFCollection.insertOne(data);
      res.send(result)
    });

    app.get('/get-study-pdf', async (req, res) => {
      const section = req.query.section;
      const query = { section: section }
      if (section === 'all') {
        const result = await PDFCollection.find({}).toArray();
        res.send(result)
      } else {
        const result = await PDFCollection.find(query).toArray();
        res.send(result);
      };
    });
    app.delete('/delete-pdf?', async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await PDFCollection.deleteOne(query);
      res.send(result);
    })

    // QuestionCollection start -------

    app.post('/add-question', async (req, res) => {
      const data = req.body;
      const result = await QuestionCollection.insertOne(data);
      res.send(result);
    });

    app.put("/update-question", async (req, res) => {
      const { id } = req.body;
      const data = req.body;
      // console.log(data);
      const query = { _id: new ObjectId(id) }
      const options = { upsert: true }
      const updateDoc = {
        $set: {
          subTopic: data.subTopic,
          subject: data.subject,
          topic: data.topic,
          opA: data.opA,
          opB: data.opB,
          opC: data.opC,
          opD: data.opD,
          ans: data.ans,
          explain: data.explain,
          question: data.question
        }
      };
      const result = await QuestionCollection.updateOne(query, updateDoc, options);
      res.send(result)
    })

    app.put("/update-question-pastJob", async (req, res) => {
      const { id } = req.body;
      const data = req.body;
      const query = { _id: new ObjectId(id), question_id: data.question_id }
      // console.log(query);
      const options = { upsert: true }
      const updateDoc = {
        $set: {
          category: data.category,
          opA: data.opA,
          opB: data.opB,
          opC: data.opC,
          opD: data.opD,
          ans: data.ans,
          explain: data.explain,
          question: data.question
        }
      };
      // const result = await QuestionCollection.updateOne(query, updateDoc, options);
      // res.send(result)

      try {
        const result = await QuestionCollection.updateOne(query, updateDoc, options);
        res.send(result);
      } catch (error) {
        console.error('Error updating document:', error);
        res.status(500).send('Internal Server Error');
      }

    })

    app.delete('/delete-question', async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await QuestionCollection.deleteOne(query);
      res.send(result);
    })

    // get all 
    app.get('/get-question', async (req, res) => {
      const { question_id } = req.query;
      const queryOne = { question_id: question_id };
      const result = await QuestionCollection.find(queryOne).toArray();
      res.send(result);
    });

    app.get('/get-all-question', async (req, res) => {
      const result = await QuestionCollection.find({}).toArray();
      res.send(result);
    })

    // filter by topic 
    app.get('/get-question-topic-job-sulation', async (req, res) => {
      const { topic, question_id } = req.query;
      const queryOne = { question_id: question_id };
      const queryTwo = { topic: topic };
      const result = await QuestionCollection.find({ $and: [queryOne, queryTwo] }).toArray();
      res.send(result);
    });

    // subtopic 
    app.get('/get-question-sub-topic-job-sulation', async (req, res) => {
      const { subTopic, question_id } = req.query;
      const queryOne = { question_id: question_id };
      const queryTwo = { subTopic: subTopic };
      const result = await QuestionCollection.find({ $and: [queryOne, queryTwo] }).toArray();
      res.send(result);
    });


    //  ======================================================================================
    //  ======================================================================================
    //                                      Get Question By Subject (Read Topically)
    //  ======================================================================================
    //  ======================================================================================

    app.get('/get-question-by-subject', async (req, res) => {
      const { question_id, subject } = req.query;
      const queryOne = { question_id: question_id };
      const queryTwo = { subject: subject };
      const result = await QuestionCollection.find({ $and: [queryOne, queryTwo] }).toArray();
      res.send(result);
    })
    app.get('/get-read-topically-question-by-topic', async (req, res) => {
      const { question_id, topic } = req.query;
      const queryOne = { question_id: question_id };
      const queryTwo = { topic: topic };
      const result = await QuestionCollection.find({ $and: [queryOne, queryTwo] }).toArray();
      res.send(result);
    })
    app.get('/get-read-topically-question-by-subtopic', async (req, res) => {
      const { question_id, subtopic } = req.query;
      const queryOne = { question_id: question_id };
      const queryTwo = { subTopic: subtopic };
      const result = await QuestionCollection.find({ $and: [queryOne, queryTwo] }).toArray();
      res.send(result);
      // console.log(subtopic);
    })


    // ---------------------------------------------------/jobs-question--------------------------------
    app.get('/jobs-question', async (req, res) => {
      const { question_id, subject } = req.query;
      const queryOne = { question_id: question_id };
      const queryTwo = { subject: subject };
      const result = await QuestionCollection.find({ $and: [queryOne, queryTwo] }).toArray();
      res.send(result);
    })
    app.get('/get-jobs-topic-question', async (req, res) => {
      const { question_id, topic } = req.query;
      const queryOne = { question_id: question_id };
      const queryTwo = { topic: topic };
      const result = await QuestionCollection.find({ $and: [queryOne, queryTwo] }).toArray();
      res.send(result);
    })
    app.get('/jobs-question-subtopic', async (req, res) => {
      const { question_id, subtopic } = req.query;
      const queryOne = { question_id: question_id };
      const queryTwo = { subTopic: subtopic };
      const result = await QuestionCollection.find({ $and: [queryOne, queryTwo] }).toArray();
      res.send(result);
    })

    //  ======================================================================================
    //  ======================================================================================
    //                                  Get Topic Topically (Read Topically)
    //  ======================================================================================
    //  ======================================================================================

    app.get('/get-topic-topically', async (req, res) => {
      const { subject } = req.query;
      const query = { subject: subject };
      const result = await ReadTopicallyTopicCollection.find(query).toArray();
      res.send(result);
    })
    app.get('/get-subtopic-topically', async (req, res) => {
      const { topic } = req.query;
      const query = { topic: topic };
      const result = await ReadTopicallySubTopicCollection.find(query).toArray();
      res.send(result);
    })
    // smart search 
    app.get('/smart-search', async (req, res) => {
      const keyword = req.query.keyword;
      if (keyword === '' || keyword === ' ' || keyword === '   ') {
        res.send([{ staus: false }]);
      } else {
        const query = { question: { $regex: keyword, $options: 'i' } };
        const result = await QuestionCollection.find(query).toArray();
        res.send(result);
      }
    })
    // quiz master 

    app.get('/quiz-master', async (req, res) => {
      const size = parseInt(req.query.size);
      const aggregationPipeline = [{ $sample: { size: size } }];
      const result = await QuestionCollection.aggregate(aggregationPipeline).toArray();
      res.send(result)
    })

    app.get('/questions', async (req, res) => {
      const subject = req.query.subject.split(',');
      const randomQuestions = await QuestionCollection.aggregate([
        { $match: { subject: { $in: subject } } },
        { $sample: { size: 3 } }
      ]).toArray();
      res.send(randomQuestions)
    });

    // --------------------------------Topically------------------------------------------------
    app.post('/add-subject-read-topiclly', async (req, res) => {
      const data = req.body;
      const result = await ReadTopicallySubjectCollection.insertOne(data);
      res.send(result);
    })
    app.delete('/delete-subject-read-topiclly', async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) }
      const result = await ReadTopicallySubjectCollection.deleteOne(query);
      res.send(result);
    })
    app.get('/get-subject-read-topiclly', async (req, res) => {
      const result = await ReadTopicallySubjectCollection.find({}).toArray();
      res.send(result);
    })

    // /add-subject-read-topiclly
    app.post('/add-topic-read-topiclly', async (req, res) => {
      const data = req.body;
      const result = await ReadTopicallyTopicCollection.insertOne(data);
      res.send(result);
    })

    app.delete('/delete-topic-read-topiclly', async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) }
      const result = await ReadTopicallyTopicCollection.deleteOne(query);
      res.send(result);
    })
    // get-topic-read-topiclly
    app.get('/get-topic-read-topiclly', async (req, res) => {
      const result = await ReadTopicallyTopicCollection.find({}).toArray();
      res.send(result);
    })

    // /add-subtopic-read-topiclly
    app.post('/add-subtopic-read-topiclly', async (req, res) => {
      const data = req.body;
      const result = await ReadTopicallySubTopicCollection.insertOne(data);
      res.send(result);
    });

    app.delete('/delete-subtopic-read-topiclly', async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) }
      const result = await ReadTopicallySubTopicCollection.deleteOne(query);
      res.send(result);
    })

    app.get('/get-subtopic-read-topiclly', async (req, res) => {
      const result = await ReadTopicallySubTopicCollection.find({}).toArray();
      res.send(result);
    })
    // --------------------------------Jobs------------------------------------------------
    app.post('/add-subject-read-jobs', async (req, res) => {
      const data = req.body;
      const result = await JobsSubjectCollection.insertOne(data);
      res.send(result);
    })
    app.delete('/delete-subject-read-jobs', async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) }
      const result = await JobsSubjectCollection.deleteOne(query);
      res.send(result);
    })
    app.get('/get-subject-read-jobs', async (req, res) => {
      const result = await JobsSubjectCollection.find({}).toArray();
      res.send(result);
    })

    // /add-subject-read-topiclly
    app.post('/add-topic-read-jobs', async (req, res) => {
      const data = req.body;
      const result = await JobsTopicCollection.insertOne(data);
      res.send(result);
    })

    app.delete('/delete-topic-read-jobs', async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) }
      const result = await JobsTopicCollection.deleteOne(query);
      res.send(result);
    })
    // get-topic-read-topiclly
    app.get('/get-topic-read-jobs', async (req, res) => {
      const result = await JobsTopicCollection.find({}).toArray();
      res.send(result);
    })

    // /add-subtopic-read-topiclly
    app.post('/add-subtopic-read-jobs', async (req, res) => {
      const data = req.body;
      const result = await JobsSubCollection.insertOne(data);
      res.send(result);
    });

    app.delete('/delete-subtopic-read-jobs', async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) }
      const result = await JobsSubCollection.deleteOne(query);
      res.send(result);
    })

    app.get('/get-subtopic-read-jobs', async (req, res) => {
      const result = await JobsSubCollection.find({}).toArray();
      res.send(result);
    })

    // get jobs topic by subject 

    app.get('/get-jobs-topic', async (req, res) => {
      const { subject } = req.query;
      const query = { subject: subject };
      const result = await JobsTopicCollection.find(query).toArray();
      res.send(result);
    })
    app.get('/get-jobs-subtopic', async (req, res) => {
      const { topic } = req.query;
      const query = { topic: topic };
      const result = await JobsSubCollection.find(query).toArray();
      res.send(result);
    })
    // ========================================= Bcs category============================================
    app.post('/bcs-past-category-add', async (req, res) => {
      const data = req.body;
      const result = await BSCCategoryCollection.insertOne(data);
      res.send(result);
    });

    app.get('/bcs-past-category-get', async (req, res) => {
      const query = {};
      const result = await BSCCategoryCollection.find(query).toArray();
      res.send(result);
    });

    app.delete('/bcs-past-category-delete', async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await BSCCategoryCollection.deleteOne(query);
      res.send(result);
    })

    app.get('/bcs-past-question', async (req, res) => {
      const { question_id, category } = req.query;
      const queryOne = { question_id: question_id };
      const queryTwo = { category: category };
      const result = await QuestionCollection.find({ $and: [queryOne, queryTwo] }).toArray();
      res.send(result);
    })
    // ========================================= past jobs category============================================
    app.post('/jobs-past-category-add', async (req, res) => {
      const data = req.body;
      const result = await PastJobsategoryCollection.insertOne(data);
      res.send(result);
    });

    app.get('/jobs-past-category-get', async (req, res) => {
      res.send(await PastJobsategoryCollection.find({}).toArray());
    });

    app.delete('/jobs-past-category-delete', async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await PastJobsategoryCollection.deleteOne(query);
      res.send(result);
    })

    app.get('/jobs-past-question', async (req, res) => {
      const { question_id, category } = req.query;
      const queryOne = { question_id: question_id };
      const queryTwo = { category: category };
      const result = await QuestionCollection.find({ $and: [queryOne, queryTwo] }).toArray();
      res.send(result);
    })

    // exam section

    app.post('/free-weakly-test-rutin', async (req, res) => {
      const data = req.body;
      const result = await FreeWeaklyRutinCollection.insertOne(data);
      res.send(result);
    });

    app.get('/free-weakly-test-rutin', async (req, res) => {
      const query = {}
      // const result = await FreeWeaklyRutinCollection.find(query).toArray();
      const result = await FreeWeaklyRutinCollection.find(query).sort({ time: -1 }).toArray();
      res.send(result)
    });

    app.delete('/free-weakly-rutin-delete', async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await FreeWeaklyRutinCollection.deleteOne(query);
      res.send(result);
    })

    app.post('/free-weakly-text-exam', async (req, res) => {
      const data = req.body;
      const result = await FreeWeaklyExamCollection.insertOne(data);
      res.send(result);
    });
    app.get('/get-free-wakly-exam', async (req, res) => {
      const { startDate } = req.query;
      const query = { startDate: startDate };
      const result = await FreeWeaklyExamCollection.findOne(query);

      if (result) {
        res.send(result);
      } else {
        res.send({});
      }
    });
    app.get('/get-free-wakly-exam-one', async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await FreeWeaklyExamCollection.findOne(query);

      if (result) {
        res.send(result);
      } else {
        res.send({});
      }
    });

    app.get('/get-freeweakly-archive', async (req, res) => {
      const { date } = req.query;
      const query = { startDate: { $ne: date } };
      const result = await FreeWeaklyExamCollection.find(query).toArray();
      res.send(result);
    });

    // get all archive 
    app.get('/get-all-archive', async (req, res) => {
      const { date } = req.query;
      const query = { startDate: { $ne: date } };
      const result = await FreeWeaklyExamCollection.find(query).toArray();
      // const combinedExams = examsFromCollectionOne.concat(examsFromCollectionTwo);
      res.send(result);
    })
    app.get('/get-all-result', async (req, res) => {
      const { email } = req.query;
      const result = await FreeWeaklyResultCollection.find({ userEmail: email }).toArray();
      // const combinedExams = examsFromCollectionOne.concat(examsFromCollectionTwo);
      res.send(result);
    })

    app.get('/get-free-weakly-archive-single', async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await FreeWeaklyExamCollection.findOne(query);
      res.send(result);
    });
    app.get('/get-free-weaklly-eaxma-all', async (req, res) => {
      const query = {};
      const result = await FreeWeaklyExamCollection.find(query).toArray();
      res.send(result);
    });
    app.get('/get-free-weaklly-single-exam', async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await FreeWeaklyExamCollection.find(query).toArray();
      res.send(result);
    });

    app.delete('/delete-free-modeltest', async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await FreeWeaklyExamCollection.deleteOne(query);
      res.send(result);
    })


    app.post('/free-weakly-result', async (req, res) => {
      const data = req.body;
      const result = await FreeWeaklyResultCollection.insertOne(data);
      res.send(result);
    });

    app.get('/free-weakly-result', async (req, res) => {
      const { userEmail } = req.query;
      const query = { userEmail: userEmail };
      const result = await FreeWeaklyResultCollection.find(query).toArray();
      res.send(result);
    })
    app.get('/free-weakly-merit-list', async (req, res) => {
      const { examDate } = req.query;
      const query = { examDate: examDate };
      const result = await FreeWeaklyResultCollection.find(query).sort({ totalCorrectAns: -1 }).toArray();
      res.send(result);
    })

    app.get('/get-single-free-result', async (req, res) => {
      const { _id } = req.query;
      const result = await FreeWeaklyResultCollection.findOne({ _id: new ObjectId(_id) })
      res.send(result);
    })

    app.get('/free-weakly-passhed', async (req, res) => {
      const { examDate, cuts } = req.query;
      const query = {
        examDate: examDate,
        totalCorrectAns: { $gte: parseInt(cuts) }
      };
      const results = await FreeWeaklyResultCollection.find(query).sort({ totalCorrectAns: -1 }).toArray();
      res.send(results);
    });


    app.put('/updated-free-weakly-participet', async (req, res) => {
      const { _id } = req.query;
      const data = req.body;
      const query = { _id: new ObjectId(_id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          participate: data.participate,
        }
      };
      const result = await FreeWeaklyExamCollection.updateOne(query, updateDoc, options);
      res.send(result)
      // console.log(data)
    })


    // BCS For New
    app.post("/Bcs-For-New-rutin", async (req, res) => {
      const data = req.body;
      const result = await BCSForNewRoutineCollection.insertOne(data);
      res.send(result);
    });

    app.get("/Bcs-For-New-rutin", async (req, res) => {
      const query = {};
      const result = await BCSForNewRoutineCollection.find(query)
        .sort({ time: -1 })
        .toArray();
      res.send(result);
    });
    app.delete("/Bcs-For-New-rutin-delete", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await BCSForNewRoutineCollection.deleteOne(query);
      res.send(result);
    });

    app.post("/Bcs-For-New-exam", async (req, res) => {
      const data = req.body;
      const result = await BcsForNewExamCollection.insertOne(data);
      res.send(result);
    });
    app.get("/Bcs-For-New-exam", async (req, res) => {
      const { startDate } = req.query;
      const query = { startDate: startDate };
      const result = await BcsForNewExamCollection.findOne(query);
      res.send(result);
    });

    // Job Solution
    app.post("/Job-Solution-rutin", async (req, res) => {
      const data = req.body;
      const result = await JobSolutionRoutineCollection.insertOne(data);
      res.send(result);
    });

    app.get("/Job-Solution-rutin", async (req, res) => {
      const query = {};
      const result = await JobSolutionRoutineCollection.find(query)
        .sort({ time: -1 })
        .toArray();
      res.send(result);
    });

    app.delete("/Job-Solution-rutin-delete", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await JobSolutionRoutineCollection.deleteOne(query);
      res.send(result);
    });

    // 9th - 20th grade preparation
    app.post("/grade-preparation", async (req, res) => {
      const data = req.body;
      const result = await gradePreparationRoutineCollection.insertOne(data);
      res.send(result);
    });

    app.get("/grade-preparation", async (req, res) => {
      const query = {};
      const result = await gradePreparationRoutineCollection
        .find(query)
        .sort({ time: -1 })
        .toArray();
      res.send(result);
    });
    app.delete("/grade-preparation-rutin-delete", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await gradePreparationRoutineCollection.deleteOne(query);
      res.send(result);
    });

    // Subject Wise
    app.post("/subject-wise", async (req, res) => {
      const data = req.body;
      const result = await subjectWiseRoutineCollection.insertOne(data);
      res.send(result);
    });

    app.get("/subject-wise", async (req, res) => {
      const query = {};
      const result = await subjectWiseRoutineCollection
        .find(query)
        .sort({ time: -1 })
        .toArray();
      res.send(result);
    });

    app.delete("/subject-wise-rutin-delete", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await subjectWiseRoutineCollection.deleteOne(query);
      res.send(result);
    });

    // Bank-Preparation
    app.post("/bank-preparation", async (req, res) => {
      const data = req.body;
      const result = await BankRoutineCollection.insertOne(data);
      res.send(result);
    });

    app.get("/bank-preparation", async (req, res) => {
      const query = {};
      const result = await BankRoutineCollection.find(query)
        .sort({ time: -1 })
        .toArray();
      res.send(result);
    });

    app.delete("/bank-preparation-rutin-delete", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await BankRoutineCollection.deleteOne(query);
      res.send(result);
    });

    // eExperience BCS
    app.post("/experience-bcs", async (req, res) => {
      const data = req.body;
      const result = await ExperienceBcsCollection.insertOne(data);
      res.send(result);
    });

    app.get("/experience-bcs", async (req, res) => {
      const query = {};
      const result = await ExperienceBcsCollection.find(query)
        .sort({ time: -1 })
        .toArray();
      res.send(result);
    });

    app.delete("/experience-bcs-rutin-delete", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await ExperienceBcsCollection.deleteOne(query);
      res.send(result);
    });

    // Teacher Preparation
    app.post("/teacher-preparation", async (req, res) => {
      const data = req.body;
      const result = await TeacherPreparationCollection.insertOne(data);
      res.send(result);
    });

    app.get("/teacher-preparation", async (req, res) => {
      const query = {};
      const result = await TeacherPreparationCollection.find(query)
        .sort({ time: -1 })
        .toArray();
      res.send(result);
    });

    app.delete("/teacher-preparation-rutin-delete", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await TeacherPreparationCollection.deleteOne(query);
      res.send(result);
    });



    // BCS For New
    app.post("/Bcs-For-New-rutin", async (req, res) => {
      const data = req.body;
      const result = await BCSForNewRoutineCollection.insertOne(data);
      res.send(result);
    });

    app.get("/Bcs-For-New-rutin", async (req, res) => {
      const query = {};
      const result = await BCSForNewRoutineCollection.find(query)
        .sort({ time: -1 })
        .toArray();
      res.send(result);
    });
    app.delete("/Bcs-For-New-rutin-delete", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await BCSForNewRoutineCollection.deleteOne(query);
      res.send(result);
    });

    app.post("/Bcs-For-New-exam", async (req, res) => {
      const data = req.body;
      const result = await BcsForNewExamCollection.insertOne(data);
      res.send(result);
    });
    app.get("/Bcs-For-New-exam", async (req, res) => {
      const { startDate } = req.query;
      const query = { startDate: startDate };
      const result = await BcsForNewExamCollection.findOne(query);
      res.send(result);
    });

    app.get("/get-newbcs-archive", async (req, res) => {
      const { date } = req.query;
      const query = { startDate: { $ne: date } };
      const result = await BcsForNewExamCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/get-newbcs-archive-single", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await BcsForNewExamCollection.findOne(query);
      res.send(result);
    });
    app.get("/get-newbcs-eaxma-all", async (req, res) => {
      const query = {};
      const result = await BcsForNewExamCollection.find(query).toArray();
      res.send(result);
    });

    app.delete("/delete-newbcs-modeltest", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await BcsForNewExamCollection.deleteOne(query);
      res.send(result);
    });

    app.post("/newbcs-result", async (req, res) => {
      const data = req.body;
      const result = await BcsForNewResultCollection.insertOne(data);
      res.send(result);
    });

    app.get("/newbcs-result", async (req, res) => {
      const { userEmail } = req.query;
      const query = { userEmail: userEmail };
      const result = await BcsForNewResultCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/newbcs-merit-list", async (req, res) => {
      const { examDate } = req.query;
      const query = { examDate: examDate };
      const result = await BcsForNewResultCollection.find(query)
        .sort({ totalCorrectAns: -1 })
        .toArray();
      res.send(result);
    });

    app.get("/get-single-newbcs-result", async (req, res) => {
      const { _id } = req.query;
      const result = await BcsForNewResultCollection.findOne({
        _id: new ObjectId(_id),
      });
      res.send(result);
    });

    app.get("/newbcs-passhed", async (req, res) => {
      const { examDate, cuts } = req.query;
      const query = {
        examDate: examDate,
        totalCorrectAns: { $gte: parseInt(cuts) },
      };
      const results = await BcsForNewResultCollection.find(query)
        .sort({ totalCorrectAns: -1 })
        .toArray();
      res.send(results);
    });

    app.put("/updated-newbcs-participet", async (req, res) => {
      const { _id } = req.query;
      const data = req.body;
      // console.log(data);
      const query = { _id: new ObjectId(_id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          participate: data.participate,
        },
      };
      const result = await BcsForNewExamCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
      // console.log(data);
    });

    // Job Solution
    app.post("/Job-Solution-rutin", async (req, res) => {
      const data = req.body;
      const result = await JobSolutionRoutineCollection.insertOne(data);
      res.send(result);
    });

    app.get("/Job-Solution-rutin", async (req, res) => {
      const query = {};
      const result = await JobSolutionRoutineCollection.find(query)
        .sort({ time: -1 })
        .toArray();
      res.send(result);
    });

    app.delete("/Job-Solution-rutin-delete", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await JobSolutionRoutineCollection.deleteOne(query);
      res.send(result);
    });

    app.post("/Job-Solution-exam", async (req, res) => {
      const data = req.body;
      const result = await JobSolutionExamCollection.insertOne(data);
      res.send(result);
    });

    app.get("/Get-Job-Solution-exam", async (req, res) => {
      const { startDate } = req.query;
      const query = { startDate: startDate };
      const result = await JobSolutionExamCollection.findOne(query);
      res.send(result);
    });

    app.get("/get-Job-Solution-archive", async (req, res) => {
      const { date } = req.query;
      const query = { startDate: { $ne: date } };
      const result = await JobSolutionExamCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/get-Job-Solution-archive-single", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await JobSolutionExamCollection.findOne(query);
      res.send(result);
    });
    app.get("/get-Job-Solution-eaxma-all", async (req, res) => {
      const query = {};
      const result = await JobSolutionExamCollection.find(query).toArray();
      res.send(result);
    });

    app.delete("/delete-Job-Solution-modeltest", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await JobSolutionExamCollection.deleteOne(query);
      res.send(result);
    });

    app.post("/Job-Solution-result", async (req, res) => {
      const data = req.body;
      const result = await JobSolutionResultCollection.insertOne(data);
      res.send(result);
    });

    app.get("/Job-Solution-result", async (req, res) => {
      const { userEmail } = req.query;
      const query = { userEmail: userEmail };
      const result = await JobSolutionResultCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/Job-Solution-merit-list", async (req, res) => {
      const { examDate } = req.query;
      const query = { examDate: examDate };
      const result = await JobSolutionResultCollection.find(query)
        .sort({ totalCorrectAns: -1 })
        .toArray();
      res.send(result);
    });

    app.get("/get-single-Job-Solution-result", async (req, res) => {
      const { _id } = req.query;
      const result = await JobSolutionResultCollection.findOne({
        _id: new ObjectId(_id),
      });
      res.send(result);
    });

    app.get("/Job-Solution-passhed", async (req, res) => {
      const { examDate, cuts } = req.query;
      const query = {
        examDate: examDate,
        totalCorrectAns: { $gte: parseInt(cuts) },
      };
      const results = await JobSolutionResultCollection.find(query)
        .sort({ totalCorrectAns: -1 })
        .toArray();
      res.send(results);
    });

    app.put("/updated-Job-Solution-participet", async (req, res) => {
      const { _id } = req.query;
      const data = req.body;
      // console.log(data);
      const query = { _id: new ObjectId(_id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          participate: data.participate,
        },
      };
      const result = await JobSolutionExamCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
      // console.log(data);
    });

    // 9th - 20th grade preparation
    app.post("/grade-preparation", async (req, res) => {
      const data = req.body;
      const result = await gradePreparationRoutineCollection.insertOne(data);
      res.send(result);
    });

    app.get("/grade-preparation", async (req, res) => {
      const query = {};
      const result = await gradePreparationRoutineCollection
        .find(query)
        .sort({ time: -1 })
        .toArray();
      res.send(result);
    });
    app.delete("/grade-preparation-rutin-delete", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await gradePreparationRoutineCollection.deleteOne(query);
      res.send(result);
    });

    app.post("/grade-preparation-exam", async (req, res) => {
      const data = req.body;
      const result = await gradePreparationExamCollection.insertOne(data);
      res.send(result);
    });

    app.get("/get-grade-preparation-exam", async (req, res) => {
      const { startDate } = req.query;
      const query = { startDate: startDate };
      const result = await gradePreparationExamCollection.findOne(query);
      res.send(result);
    });

    app.get("/get-grade-preparation-archive", async (req, res) => {
      const { date } = req.query;
      const query = { startDate: { $ne: date } };
      const result = await gradePreparationExamCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/get-grade-preparation-archive-single", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await gradePreparationExamCollection.findOne(query);
      res.send(result);
    });
    app.get(
      "/get-grade-preparation-eaxma-all",
      async (req, res) => {
        const query = {};
        const result = await gradePreparationExamCollection
          .find(query)
          .toArray();
        res.send(result);
      }
    );

    app.delete("/delete-grade-preparation-modeltest", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await gradePreparationExamCollection.deleteOne(query);
      res.send(result);
    });

    app.post("/grade-preparation-result", async (req, res) => {
      const data = req.body;
      const result = await gradePreparationResultCollection.insertOne(data);
      res.send(result);
    });

    app.get("/grade-preparation-result", async (req, res) => {
      const { userEmail } = req.query;
      const query = { userEmail: userEmail };
      const result = await gradePreparationResultCollection
        .find(query)
        .toArray();
      res.send(result);
    });
    app.get("/grade-preparation-merit-list", async (req, res) => {
      const { examDate } = req.query;
      const query = { examDate: examDate };
      const result = await gradePreparationResultCollection
        .find(query)
        .sort({ totalCorrectAns: -1 })
        .toArray();
      res.send(result);
    });

    app.get("/get-single-grade-preparation-result", async (req, res) => {
      const { _id } = req.query;
      const result = await gradePreparationResultCollection.findOne({
        _id: new ObjectId(_id),
      });
      res.send(result);
    });

    app.get("/grade-preparation-passhed", async (req, res) => {
      const { examDate, cuts } = req.query;
      const query = {
        examDate: examDate,
        totalCorrectAns: { $gte: parseInt(cuts) },
      };
      const results = await gradePreparationResultCollection
        .find(query)
        .sort({ totalCorrectAns: -1 })
        .toArray();
      res.send(results);
    });

    app.put("/updated-grade-preparation-participet", async (req, res) => {
      const { _id } = req.query;
      const data = req.body;
      // console.log(data);
      const query = { _id: new ObjectId(_id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          participate: data.participate,
        },
      };
      const result = await gradePreparationExamCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
      // console.log(data);
    });

    // Subject Wise
    app.post("/subject-wise", async (req, res) => {
      const data = req.body;
      const result = await subjectWiseRoutineCollection.insertOne(data);
      res.send(result);
    });

    app.get("/subject-wise", async (req, res) => {
      const query = {};
      const result = await subjectWiseRoutineCollection
        .find(query)
        .sort({ time: -1 })
        .toArray();
      res.send(result);
    });

    app.delete("/subject-wise-rutin-delete", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await subjectWiseRoutineCollection.deleteOne(query);
      res.send(result);
    });

    app.post("/subject-wise-exam", async (req, res) => {
      const data = req.body;
      const result = await subjectWiseExamCollection.insertOne(data);
      res.send(result);
    });

    app.get("/get-subject-wise-exam", async (req, res) => {
      const { startDate } = req.query;
      const query = { startDate: startDate };
      const result = await subjectWiseExamCollection.findOne(query);
      res.send(result);
    });

    app.get("/get-subject-wise-archive", async (req, res) => {
      const { date } = req.query;
      const query = { startDate: { $ne: date } };
      const result = await subjectWiseExamCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/get-subject-wise-archive-single", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await subjectWiseExamCollection.findOne(query);
      res.send(result);
    });
    app.get("/get-subject-wise-eaxma-all", async (req, res) => {
      const query = {};
      const result = await subjectWiseExamCollection.find(query).toArray();
      res.send(result);
    });

    app.delete("/delete-subject-wise-modeltest", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await subjectWiseExamCollection.deleteOne(query);
      res.send(result);
    });

    app.post("/subject-wise-result", async (req, res) => {
      const data = req.body;
      const result = await subjectWiseResultCollection.insertOne(data);
      res.send(result);
    });

    app.get("/subject-wise-result", async (req, res) => {
      const { userEmail } = req.query;
      const query = { userEmail: userEmail };
      const result = await subjectWiseResultCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/subject-wise-merit-list", async (req, res) => {
      const { examDate } = req.query;
      const query = { examDate: examDate };
      const result = await subjectWiseResultCollection
        .find(query)
        .sort({ totalCorrectAns: -1 })
        .toArray();
      res.send(result);
    });

    app.get("/get-single-subject-wise-result", async (req, res) => {
      const { _id } = req.query;
      const result = await subjectWiseResultCollection.findOne({
        _id: new ObjectId(_id),
      });
      res.send(result);
    });

    app.get("/subject-wise-passhed", async (req, res) => {
      const { examDate, cuts } = req.query;
      const query = {
        examDate: examDate,
        totalCorrectAns: { $gte: parseInt(cuts) },
      };
      const results = await subjectWiseResultCollection
        .find(query)
        .sort({ totalCorrectAns: -1 })
        .toArray();
      res.send(results);
    });

    app.put("/updated-subject-wise-participet", async (req, res) => {
      const { _id } = req.query;
      const data = req.body;
      // console.log(data);
      const query = { _id: new ObjectId(_id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          participate: data.participate,
        },
      };
      const result = await subjectWiseExamCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
      // console.log(data);
    });

    // ------------------------Bank-Preparation-------------------------------
    app.post("/bank-preparation", async (req, res) => {
      const data = req.body;
      const result = await BankRoutineCollection.insertOne(data);
      res.send(result);
    });

    app.get("/bank-preparation", async (req, res) => {
      const query = {};
      const result = await BankRoutineCollection.find(query)
        .sort({ time: -1 })
        .toArray();
      res.send(result);
    });

    app.delete("/bank-preparation-rutin-delete", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await BankRoutineCollection.deleteOne(query);
      res.send(result);
    });

    app.post("/bank-preparation-exam", async (req, res) => {
      const data = req.body;
      const result = await BankExamCollection.insertOne(data);
      res.send(result);
    });

    app.get("/get-bank-preparation-exam", async (req, res) => {
      const { startDate } = req.query;
      const query = { startDate: startDate };
      const result = await BankExamCollection.findOne(query);
      res.send(result);
    });

    app.get("/get-bank-preparation-archive", async (req, res) => {
      const { date } = req.query;
      const query = { startDate: { $ne: date } };
      const result = await BankExamCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/get-bank-preparation-archive-single", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await BankExamCollection.findOne(query);
      res.send(result);
    });
    app.get("/get-bank-preparation-eaxma-all", async (req, res) => {
      const query = {};
      const result = await BankExamCollection.find(query).toArray();
      res.send(result);
    });

    app.delete("/delete-bank-preparation-modeltest", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await BankExamCollection.deleteOne(query);
      res.send(result);
    });

    app.post("/bank-preparation-result", async (req, res) => {
      const data = req.body;
      const result = await BankResultCollection.insertOne(data);
      res.send(result);
    });

    app.get("/bank-preparation-result", async (req, res) => {
      const { userEmail } = req.query;
      const query = { userEmail: userEmail };
      const result = await BankResultCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/bank-preparation-merit-list", async (req, res) => {
      const { examDate } = req.query;
      const query = { examDate: examDate };
      const result = await BankResultCollection.find(query)
        .sort({ totalCorrectAns: -1 })
        .toArray();
      res.send(result);
    });

    app.get("/get-single-bank-preparation-result", async (req, res) => {
      const { _id } = req.query;
      const result = await BankResultCollection.findOne({
        _id: new ObjectId(_id),
      });
      res.send(result);
    });

    app.get("/bank-preparation-passhed", async (req, res) => {
      const { examDate, cuts } = req.query;
      const query = {
        examDate: examDate,
        totalCorrectAns: { $gte: parseInt(cuts) },
      };
      const results = await BankResultCollection.find(query)
        .sort({ totalCorrectAns: -1 })
        .toArray();
      res.send(results);
    });

    app.put("/updated-bank-preparation-participet", async (req, res) => {
      const { _id } = req.query;
      const data = req.body;
      // console.log(data);
      const query = { _id: new ObjectId(_id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          participate: data.participate,
        },
      };
      const result = await BankExamCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
      // console.log(data);
    });

    // Experience BCS
    app.post("/experience-bcs", async (req, res) => {
      const data = req.body;
      const result = await ExperienceBcsCollection.insertOne(data);
      res.send(result);
    });

    app.get("/experience-bcs", async (req, res) => {
      const query = {};
      const result = await ExperienceBcsCollection.find(query)
        .sort({ time: -1 })
        .toArray();
      res.send(result);
    });

    app.delete("/experience-bcs-rutin-delete", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await ExperienceBcsCollection.deleteOne(query);
      res.send(result);
    });

    app.post("/experience-bcs-exam", async (req, res) => {
      const data = req.body;
      const result = await ExperienceBcsExamCollection.insertOne(data);
      res.send(result);
    });

    app.get("/get-experience-bcs-exam", async (req, res) => {
      const { startDate } = req.query;
      const query = { startDate: startDate };
      const result = await ExperienceBcsExamCollection.findOne(query);
      res.send(result);
    });

    app.get("/get-experience-bcs-archive", async (req, res) => {
      const { date } = req.query;
      const query = { startDate: { $ne: date } };
      const result = await ExperienceBcsExamCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/get-experience-bcs-archive-single", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await ExperienceBcsExamCollection.findOne(query);
      res.send(result);
    });
    app.get("/get-experience-bcs-eaxma-all", async (req, res) => {
      const query = {};
      const result = await ExperienceBcsExamCollection.find(query).toArray();
      res.send(result);
    });

    app.delete("/delete-experience-bcs-modeltest", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await ExperienceBcsExamCollection.deleteOne(query);
      res.send(result);
    });

    app.post("/experience-bcs-result", async (req, res) => {
      const data = req.body;
      const result = await ExperienceBcsResultCollection.insertOne(data);
      res.send(result);
    });

    app.get("/experience-bcs-result", async (req, res) => {
      const { userEmail } = req.query;
      const query = { userEmail: userEmail };
      const result = await ExperienceBcsResultCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/experience-bcs-merit-list", async (req, res) => {
      const { examDate } = req.query;
      const query = { examDate: examDate };
      const result = await ExperienceBcsResultCollection.find(query)
        .sort({ totalCorrectAns: -1 })
        .toArray();
      res.send(result);
    });

    app.get("/get-single-experience-bcs-result", async (req, res) => {
      const { _id } = req.query;
      const result = await ExperienceBcsResultCollection.findOne({
        _id: new ObjectId(_id),
      });
      res.send(result);
    });

    app.get("/experience-bcs-passhed", async (req, res) => {
      const { examDate, cuts } = req.query;
      const query = {
        examDate: examDate,
        totalCorrectAns: { $gte: parseInt(cuts) },
      };
      const results = await ExperienceBcsResultCollection.find(query)
        .sort({ totalCorrectAns: -1 })
        .toArray();
      res.send(results);
    });

    app.put("/updated-experience-bcs-participet", async (req, res) => {
      const { _id } = req.query;
      const data = req.body;
      // console.log(data);
      const query = { _id: new ObjectId(_id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          participate: data.participate,
        },
      };
      const result = await ExperienceBcsExamCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
      // console.log(data);
    });

    // Teacher Preparation
    app.post("/teacher-preparation", async (req, res) => {
      const data = req.body;
      const result = await TeacherPreparationCollection.insertOne(data);
      res.send(result);
    });

    app.get("/teacher-preparation", async (req, res) => {
      const query = {};
      const result = await TeacherPreparationCollection.find(query)
        .sort({ time: -1 })
        .toArray();
      res.send(result);
    });

    app.delete("/teacher-preparation-rutin-delete", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await TeacherPreparationCollection.deleteOne(query);
      res.send(result);
    });

    app.post("/teacher-preparation-exam", async (req, res) => {
      const data = req.body;
      const result = await TeacherPreparationExamCollection.insertOne(data);
      res.send(result);
    });

    app.get("/get-teacher-preparation-exam", async (req, res) => {
      const { startDate } = req.query;
      const query = { startDate: startDate };
      const result = await TeacherPreparationExamCollection.findOne(query);
      res.send(result);
    });
    app.get("/get-teacher-preparation-archive", async (req, res) => {
      const { date } = req.query;
      const query = { startDate: { $ne: date } };
      const result = await TeacherPreparationExamCollection.find(
        query
      ).toArray();
      res.send(result);
    });

    app.get("/get-teacher-preparation-archive-single", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await TeacherPreparationExamCollection.findOne(query);
      res.send(result);
    });
    app.get("/get-teacher-preparation-eaxma-all", async (req, res) => {
      const query = {};
      const result = await TeacherPreparationExamCollection.find(
        query
      ).toArray();
      res.send(result);
    });

    app.delete("/delete-teacher-preparation-modeltest", async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await TeacherPreparationExamCollection.deleteOne(query);
      res.send(result);
    });

    app.post("/teacher-preparation-result", async (req, res) => {
      const data = req.body;
      const result = await TeacherPreparationResultCollection.insertOne(data);
      res.send(result);
    });

    app.get("/teacher-preparation-result", async (req, res) => {
      const { userEmail } = req.query;
      const query = { userEmail: userEmail };
      const result = await TeacherPreparationResultCollection.find(
        query
      ).toArray();
      res.send(result);
    });
    app.get("/teacher-preparation-merit-list", async (req, res) => {
      const { examDate } = req.query;
      const query = { examDate: examDate };
      const result = await TeacherPreparationResultCollection.find(query)
        .sort({ totalCorrectAns: -1 })
        .toArray();
      res.send(result);
    });

    app.get("/get-single-teacher-preparation-result", async (req, res) => {
      const { _id } = req.query;
      const result = await TeacherPreparationResultCollection.findOne({
        _id: new ObjectId(_id),
      });
      res.send(result);
    });

    app.get("/teacher-preparation-passhed", async (req, res) => {
      const { examDate, cuts } = req.query;
      const query = {
        examDate: examDate,
        totalCorrectAns: { $gte: parseInt(cuts) },
      };
      const results = await TeacherPreparationResultCollection.find(query)
        .sort({ totalCorrectAns: -1 })
        .toArray();
      res.send(results);
    });

    app.put("/updated-teacher-preparation-participet", async (req, res) => {
      const { _id } = req.query;
      const data = req.body;
      // console.log(data);
      const query = { _id: new ObjectId(_id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          participate: data.participate,
        },
      };
      const result = await TeacherPreparationExamCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
      // console.log(data);
    });

    // Favorite Section

    app.post("/add-favorite", async (req, res) => {
      const data = req.body;
      const queryOne = { _id: new ObjectId(data._id) }
      const queryTwo = { email: data.email }

      const existingData = await FavoriteCollection.findOne({ $and: [queryOne, queryTwo] });

      if (existingData) {
        res.status(409).json({ message: "Data already exists" });
      } else {
        const result = await FavoriteCollection.insertOne(data);
        res.json(result);
      }
      // console.log(data);
    });

    app.get("/get-favorite", async (req, res) => {
      const { email } = req.query;
      const query = { email: email };
      const result = await FavoriteCollection.find(query).toArray();
      res.send(result);
    });

    // Log In
    app.put("/user-update", async (req, res) => {
      const { email } = req.query;
      const query = { email: email };
      const data = req.body;
      const options = { upsert: true };
      const existingUser = await UserCollection.findOne(query);
      // console.log(existingUser);
      if (!existingUser) {
        let updateDoc = {
          $set: {
            Address: data.Address,
            Mobile: data.Mobile,
            Package: data.Package,
            PackageEndDate: data.PackageEndDate,
            PackageStartDate: data.PackageStartDate,
            PackageType: data.PackageType,
            UserName: data.UserName,
            UserStatus: data.UserStatus,
            Role: data.Role
          },
        };

        const result = await UserCollection.updateOne(query, updateDoc, options);
        return res.send(result);
      }

      let updateDoc = {
        $set: {
          Address: data.Address,
          Mobile: data.Mobile,
          Package: data.Package,
          PackageEndDate: data.PackageEndDate,
          PackageStartDate: data.PackageStartDate,
          PackageType: data.PackageType,
          UserName: data.UserName,
          UserStatus: data.UserStatus,
        },
      };
      if (existingUser.Role === "Admin") {
        updateDoc.$set.Role = "Admin";
      } else if (data.Role) {
        updateDoc.$set.Role = data.Role;
      }

      const result = await UserCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });

    app.get("/get-users", async (req, res) => {
      const query = {};
      const result = await UserCollection.find(query).toArray();
      res.send(result);
    })

    app.delete('/delete-user', async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const result = await UserCollection.deleteOne(query);
      res.send(result);
    });


    app.put('/make-admin', async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const updateDoc = {
        $set: {
          Role: 'Admin',
        },
      };
      const result = await UserCollection.updateOne(query, updateDoc);
      res.send(result);
    })
    app.put('/make-user', async (req, res) => {
      const { _id } = req.query;
      const query = { _id: new ObjectId(_id) };
      const updateDoc = {
        $set: {
          Role: 'User',
        },
      };
      const result = await UserCollection.updateOne(query, updateDoc);
      res.send(result);
    })


    app.get('/get-user-email', async (req, res) => {
      const { email } = req.query;
      const query = { email: email };
      const result = await UserCollection.findOne(query);
      res.send(result);
      // console.log(email);
    })




  } finally {

  }
}


run();


app.listen(port, () => {
  console.log("Running your server");
});