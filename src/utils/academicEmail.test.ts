// npm test
import assert from "node:assert/strict";
import { test } from "node:test";
import { isAcademicEmail } from "./academicEmail.ts";

test("accepts academic domains", () => {
  for (const email of [
    "a@mit.edu",
    "a@cs.stanford.edu",
    "a@ox.ac.uk",
    "a@unimelb.edu.au",
    "a@u-tokyo.ac.jp",
    "a@tsinghua.edu.cn",
    "A.Name+tag@MIT.EDU",
  ]) {
    assert.ok(isAcademicEmail(email), email);
  }
});

test("rejects everything else", () => {
  for (const email of [
    "a@gmail.com",
    "a@education.com",
    "a@edu.com",
    "a@myedu.io",
    "a@ac.company.com",
    "a@mit.edu.evil.com",
    "mit.edu",
    "@mit.edu",
    "a@",
    "",
    "a@mit..edu",
    "a@mit.edu ",
  ]) {
    assert.equal(isAcademicEmail(email), email.trim() === "a@mit.edu", email);
  }
});
