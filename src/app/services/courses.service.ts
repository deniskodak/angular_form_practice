import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Course, CourseCategories } from "../model/course";
import { map } from "rxjs/operators";
import { Lesson } from "../model/lesson";
import { environment } from "../../environments/environment";

@Injectable()
export class CoursesService {
  constructor(private http: HttpClient) {}

  findCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`${environment.api}/api/courses/${courseId}`);
  }

  findCourseCategories(): Observable<CourseCategories[]> {
    return this.http
      .get<CourseCategories[]>(`${environment.api}/api/course-categories`)
      .pipe(map((res) => res["categories"]));
  }

  findAllCourses(): Observable<Course[]> {
    return this.http.get(`${environment.api}/api/courses`).pipe(map((res) => res["payload"]));
  }

  findAllCourseLessons(courseId: number): Observable<Lesson[]> {
    return this.http
      .get(`${environment.api}/api/lessons`, {
        params: new HttpParams()
          .set("courseId", courseId.toString())
          .set("pageNumber", "0")
          .set("pageSize", "1000"),
      })
      .pipe(map((res) => res["payload"]));
  }

  findLessons(
    courseId: number,
    filter = "",
    sortOrder = "asc",
    pageNumber = 0,
    pageSize = 3
  ): Observable<Lesson[]> {
    return this.http
      .get(`${environment.api}/api/lessons`, {
        params: new HttpParams()
          .set("courseId", courseId.toString())
          .set("filter", filter)
          .set("sortOrder", sortOrder)
          .set("pageNumber", pageNumber.toString())
          .set("pageSize", pageSize.toString()),
      })
      .pipe(map((res) => res["payload"]));
  }
}
